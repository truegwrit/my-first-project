import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Text, Avatar, IconButton, Chip } from 'react-native-paper';
import api from '../../config/api';

export default function FeedScreen() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const response = await api.get('/social/feed');
      setFeed(response.data);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (itemId, isLiked) => {
    try {
      if (isLiked) {
        await api.delete(`/social/like/${itemId}`);
      } else {
        await api.post(`/social/like/${itemId}`);
      }

      setFeed(feed.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            is_liked: !isLiked,
            like_count: isLiked ? item.like_count - 1 : item.like_count + 1,
          };
        }
        return item;
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const renderFeedItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.display_name || item.username}
        subtitle={`@${item.username}`}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={{ uri: item.avatar_url || 'https://via.placeholder.com/50' }}
          />
        )}
      />

      <Card.Content>
        {item.share_message && (
          <Paragraph style={styles.shareMessage}>{item.share_message}</Paragraph>
        )}

        <View style={styles.recommendationContainer}>
          <Chip style={styles.typeChip}>{item.type}</Chip>
          <Title style={styles.artTitle}>{item.title}</Title>
          <Paragraph style={styles.creator}>{item.creator}</Paragraph>

          {item.description && (
            <Paragraph numberOfLines={2} style={styles.description}>
              {item.description}
            </Paragraph>
          )}

          {item.reason && (
            <View style={styles.reasonContainer}>
              <Text style={styles.reasonLabel}>Recommended because:</Text>
              <Text numberOfLines={2} style={styles.reason}>{item.reason}</Text>
            </View>
          )}
        </View>
      </Card.Content>

      <Card.Actions>
        <IconButton
          icon={item.is_liked ? 'heart' : 'heart-outline'}
          iconColor={item.is_liked ? '#e91e63' : undefined}
          onPress={() => toggleLike(item.id, item.is_liked)}
        />
        <Text>{item.like_count || 0}</Text>
        <IconButton icon="comment-outline" />
        <IconButton icon="share-variant" />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {feed.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No posts yet</Text>
          <Text style={styles.emptySubtext}>
            Follow users to see their shared recommendations
          </Text>
        </View>
      ) : (
        <FlatList
          data={feed}
          renderItem={renderFeedItem}
          keyExtractor={(item) => item.id.toString()}
          refreshing={loading}
          onRefresh={loadFeed}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 10,
  },
  shareMessage: {
    marginBottom: 10,
    fontStyle: 'italic',
  },
  recommendationContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  typeChip: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#e3f2fd',
  },
  artTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  creator: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  reasonContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff3e0',
    borderRadius: 5,
  },
  reasonLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
  },
  reason: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 10,
  },
  emptySubtext: {
    color: '#666',
    textAlign: 'center',
  },
});
