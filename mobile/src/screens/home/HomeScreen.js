import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();

  const artCategories = [
    { name: 'Artwork', icon: '🎨' },
    { name: 'Film & TV', icon: '🎬' },
    { name: 'Music', icon: '🎵' },
    { name: 'Books', icon: '📚' },
    { name: 'Comics', icon: '📖' },
    { name: 'Animation', icon: '🎞️' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.welcomeText}>
          Welcome back, {user?.displayName || user?.username}!
        </Title>
        <Paragraph style={styles.subtitle}>
          Let's discover some amazing art together
        </Paragraph>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Start a Conversation</Title>
          <Paragraph>
            Chat with AI to discover art that matches your taste, mood, and interests
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Chat')}
          >
            New Chat
          </Button>
        </Card.Actions>
      </Card>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Explore by Category</Title>
        <View style={styles.categoryContainer}>
          {artCategories.map((category, index) => (
            <Chip
              key={index}
              style={styles.chip}
              onPress={() => {}}
            >
              {category.icon} {category.name}
            </Chip>
          ))}
        </View>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Your Saved Items</Title>
          <Paragraph>
            View your saved recommendations and reviews
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() => navigation.navigate('Discover', { screen: 'Saved' })}
          >
            View Saved
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Community Feed</Title>
          <Paragraph>
            See what others are discovering
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('Feed')}>
            Explore Feed
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
    paddingTop: 40,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    opacity: 0.9,
  },
  card: {
    margin: 15,
    marginBottom: 10,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    marginRight: 10,
    marginBottom: 10,
  },
});
