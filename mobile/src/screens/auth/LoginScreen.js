import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Title style={styles.title}>AI Art Discovery</Title>
        <Text style={styles.subtitle}>
          Discover art through AI-powered conversations
        </Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading || !email || !password}
          style={styles.button}
        >
          Login
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        >
          Don't have an account? Register
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
