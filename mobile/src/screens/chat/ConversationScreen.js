import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton, Card, Text, Chip } from 'react-native-paper';
import api from '../../config/api';
import io from 'socket.io-client';

export default function ConversationScreen({ route }) {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [realtimeRec, setRealtimeRec] = useState(null);
  const flatListRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    loadConversation();
    setupSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [conversationId]);

  const setupSocket = () => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join_conversation', conversationId);
    });

    socket.on('new_message', (data) => {
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      }
      if (data.realtimeRecommendation) {
        setRealtimeRec(data.realtimeRecommendation);
        setTimeout(() => setRealtimeRec(null), 10000);
      }
    });
  };

  const loadConversation = async () => {
    try {
      const response = await api.get(`/chat/conversations/${conversationId}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputText,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      await api.post(`/chat/conversations/${conversationId}/messages`, {
        content: inputText,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.role === 'user' ? styles.userMessage : styles.assistantMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
      <Text style={styles.messageTime}>
        {new Date(item.created_at).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {realtimeRec && (
        <Card style={styles.recommendationCard}>
          <Card.Content>
            <Text style={styles.recTitle}>Real-time Recommendation</Text>
            <Text style={styles.recArtTitle}>{realtimeRec.artItem?.title}</Text>
            <Text>{realtimeRec.artItem?.creator}</Text>
            <Chip style={styles.recChip}>{realtimeRec.artItem?.type}</Chip>
            <Text style={styles.recReason}>{realtimeRec.reason}</Text>
          </Card.Content>
        </Card>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          mode="outlined"
          style={styles.input}
          multiline
          disabled={loading}
        />
        <IconButton
          icon="send"
          size={24}
          onPress={sendMessage}
          disabled={loading || !inputText.trim()}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageList: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6200ee',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 5,
  },
  recommendationCard: {
    margin: 10,
    backgroundColor: '#e3f2fd',
  },
  recTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recArtTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recChip: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  recReason: {
    fontStyle: 'italic',
    marginTop: 5,
  },
});
