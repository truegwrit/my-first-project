import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Title, Text, Button, Card, Divider } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    conversations: 0,
  });

  useEffect(() => {
    loadProfile();
    loadStats();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await api.get('/user/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadStats = async () => {
    try {
      const [followersRes, followingRes, conversationsRes] = await Promise.all([
        api.get('/social/followers'),
        api.get('/social/following'),
        api.get('/chat/conversations'),
      ]);

      setStats({
        followers: followersRes.data.length,
        following: followingRes.data.length,
        conversations: conversationsRes.data.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{ uri: profile?.avatar_url || 'https://via.placeholder.com/100' }}
        />
        <Title style={styles.displayName}>
          {profile?.display_name || user?.displayName}
        </Title>
        <Text style={styles.username}>@{user?.username}</Text>
        {profile?.bio && (
          <Text style={styles.bio}>{profile.bio}</Text>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{stats.conversations}</Text>
          <Text style={styles.statLabel}>Conversations</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{stats.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{stats.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Preferences</Title>
          {profile?.preferences && (
            <>
              <Text>AI Model: {profile.preferences.preferred_ai_model}</Text>
              <Text style={styles.prefsText}>
                Categories: {profile.preferences.art_categories?.length || 0} selected
              </Text>
            </>
          )}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('Settings')}>
            Edit Settings
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Account</Title>
          <Text>Email: {user?.email}</Text>
          <Text>Member since: {new Date(profile?.created_at).toLocaleDateString()}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor="#d32f2f"
      >
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  displayName: {
    marginTop: 10,
    fontSize: 24,
  },
  username: {
    color: '#666',
    marginBottom: 10,
  },
  bio: {
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  divider: {
    width: 1,
    height: '100%',
  },
  card: {
    margin: 10,
  },
  prefsText: {
    marginTop: 5,
  },
  logoutButton: {
    margin: 20,
  },
});
