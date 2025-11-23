import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Text, Chip, IconButton } from 'react-native-paper';
import api from '../../config/api';

export default function SavedScreen() {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedItems();
  }, []);

  const loadSavedItems = async () => {
    try {
      const response = await api.get('/recommendations/saved');
      setSavedItems(response.data);
    } catch (error) {
      console.error('Error loading saved items:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedItem = async (itemId) => {
    try {
      await api.delete(`/recommendations/saved/${itemId}`);
      setSavedItems(savedItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing saved item:', error);
    }
  };

  const renderSavedItem = ({ item }) => (
    <Card style={styles.card}>
      {item.image_url && (
        <Card.Cover source={{ uri: item.image_url }} />
      )}
      <Card.Content>
        <View style={styles.header}>
          <Chip style={styles.typeChip}>{item.type}</Chip>
        </View>

        <Title style={styles.title}>{item.title}</Title>
        <Paragraph style={styles.creator}>{item.creator}</Paragraph>

        {item.description && (
          <Paragraph numberOfLines={3} style={styles.description}>
            {item.description}
          </Paragraph>
        )}

        {item.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Your notes:</Text>
            <Text>{item.notes}</Text>
          </View>
        )}
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="delete"
          onPress={() => removeSavedItem(item.id)}
        />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {savedItems.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No saved items yet</Text>
          <Text style={styles.emptySubtext}>
            Save recommendations from your conversations
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedItems}
          renderItem={renderSavedItem}
          keyExtractor={(item) => item.id.toString()}
          refreshing={loading}
          onRefresh={loadSavedItems}
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
  },
  typeChip: {
    backgroundColor: '#e3f2fd',
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
  notesContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  notesLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
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
