import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Text, Chip, IconButton, Button } from 'react-native-paper';
import api from '../../config/api';

export default function RecommendationsScreen({ navigation, route }) {
  const { conversationId } = route.params || {};
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (conversationId) {
      loadRecommendations();
    }
  }, [conversationId]);

  const loadRecommendations = async () => {
    try {
      const response = await api.get(`/recommendations/conversations/${conversationId}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await api.post(`/recommendations/conversations/${conversationId}/summary`);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveRecommendation = async (recId) => {
    try {
      await api.post(`/recommendations/${recId}/save`);
      alert('Recommendation saved!');
    } catch (error) {
      console.error('Error saving recommendation:', error);
    }
  };

  const renderRecommendation = ({ item }) => (
    <Card style={styles.card}>
      {item.image_url && (
        <Card.Cover source={{ uri: item.image_url }} />
      )}
      <Card.Content>
        <View style={styles.header}>
          <Chip style={styles.typeChip}>{item.type}</Chip>
          {item.relevance_score && (
            <Chip style={styles.scoreChip}>
              {Math.round(item.relevance_score * 100)}% match
            </Chip>
          )}
        </View>

        <Title style={styles.title}>{item.title}</Title>
        <Paragraph style={styles.creator}>{item.creator}</Paragraph>

        {item.description && (
          <Paragraph numberOfLines={3} style={styles.description}>
            {item.description}
          </Paragraph>
        )}

        {item.reason && (
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonLabel}>Why we recommend this:</Text>
            <Text style={styles.reason}>{item.reason}</Text>
          </View>
        )}
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="bookmark"
          onPress={() => saveRecommendation(item.id)}
        />
        {item.external_url && (
          <Button onPress={() => {}}>Learn More</Button>
        )}
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {recommendations.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No recommendations yet</Text>
          {conversationId && (
            <Button
              mode="contained"
              onPress={generateSummary}
              style={styles.generateButton}
            >
              Generate Summary Recommendations
            </Button>
          )}
        </View>
      ) : (
        <FlatList
          data={recommendations}
          renderItem={renderRecommendation}
          keyExtractor={(item) => item.id.toString()}
          refreshing={loading}
          onRefresh={conversationId ? loadRecommendations : undefined}
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
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  typeChip: {
    backgroundColor: '#e3f2fd',
  },
  scoreChip: {
    backgroundColor: '#e8f5e9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  creator: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  reasonContainer: {
    backgroundColor: '#fff3e0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  reasonLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reason: {
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
    marginBottom: 20,
  },
  generateButton: {
    marginTop: 10,
  },
});
