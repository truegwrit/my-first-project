import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB, Card, Title, Paragraph, Text, Dialog, Portal, TextInput, Button, RadioButton } from 'react-native-paper';
import api from '../../config/api';

export default function ChatScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newConvTitle, setNewConvTitle] = useState('');
  const [selectedAI, setSelectedAI] = useState('claude');

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const response = await api.get('/chat/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async () => {
    try {
      const response = await api.post('/chat/conversations', {
        title: newConvTitle || 'New Conversation',
        aiModel: selectedAI,
      });

      setDialogVisible(false);
      setNewConvTitle('');
      navigation.navigate('Conversation', { conversationId: response.data.id });
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Conversation', { conversationId: item.id })}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph>AI Model: {item.ai_model}</Paragraph>
          <Text style={styles.date}>
            {new Date(item.updated_at).toLocaleDateString()}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {conversations.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No conversations yet</Text>
          <Text style={styles.emptySubtext}>Start a new chat to discover art!</Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id.toString()}
          refreshing={loading}
          onRefresh={loadConversations}
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setDialogVisible(true)}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>New Conversation</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title (optional)"
              value={newConvTitle}
              onChangeText={setNewConvTitle}
              mode="outlined"
              style={styles.input}
            />

            <Text style={styles.label}>Select AI Model:</Text>
            <RadioButton.Group onValueChange={setSelectedAI} value={selectedAI}>
              <View style={styles.radioItem}>
                <RadioButton value="claude" />
                <Text>Claude (Anthropic)</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="gpt" />
                <Text>ChatGPT (OpenAI)</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="gemini" />
                <Text>Gemini (Google)</Text>
              </View>
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={createConversation}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    color: '#666',
  },
  input: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});
