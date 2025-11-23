import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Title, RadioButton, Text, Checkbox } from 'react-native-paper';
import api from '../../config/api';

export default function SettingsScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [preferredAI, setPreferredAI] = useState('claude');
  const [artCategories, setArtCategories] = useState({
    artwork: false,
    film: false,
    music: false,
    books: false,
    comics: false,
    animation: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await api.get('/user/profile');
      setDisplayName(response.data.display_name || '');
      setBio(response.data.bio || '');

      if (response.data.preferences) {
        setPreferredAI(response.data.preferences.preferred_ai_model || 'claude');

        const cats = response.data.preferences.art_categories || [];
        const categoriesObj = {
          artwork: cats.includes('artwork'),
          film: cats.includes('film'),
          music: cats.includes('music'),
          books: cats.includes('books'),
          comics: cats.includes('comics'),
          animation: cats.includes('animation'),
        };
        setArtCategories(categoriesObj);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      await api.put('/user/profile', {
        displayName,
        bio,
      });

      const selectedCategories = Object.keys(artCategories).filter(
        key => artCategories[key]
      );

      await api.put('/user/preferences', {
        preferredAiModel: preferredAI,
        artCategories: selectedCategories,
      });

      alert('Settings saved successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Title>Profile</Title>
        <TextInput
          label="Display Name"
          value={displayName}
          onChangeText={setDisplayName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Title>AI Preferences</Title>
        <Text style={styles.label}>Preferred AI Model:</Text>
        <RadioButton.Group onValueChange={setPreferredAI} value={preferredAI}>
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
      </View>

      <View style={styles.section}>
        <Title>Art Categories</Title>
        <Text style={styles.label}>Select your interests:</Text>

        <View style={styles.checkboxItem}>
          <Checkbox
            status={artCategories.artwork ? 'checked' : 'unchecked'}
            onPress={() => setArtCategories({...artCategories, artwork: !artCategories.artwork})}
          />
          <Text>Artwork & Photography</Text>
        </View>

        <View style={styles.checkboxItem}>
          <Checkbox
            status={artCategories.film ? 'checked' : 'unchecked'}
            onPress={() => setArtCategories({...artCategories, film: !artCategories.film})}
          />
          <Text>Film & TV</Text>
        </View>

        <View style={styles.checkboxItem}>
          <Checkbox
            status={artCategories.music ? 'checked' : 'unchecked'}
            onPress={() => setArtCategories({...artCategories, music: !artCategories.music})}
          />
          <Text>Music</Text>
        </View>

        <View style={styles.checkboxItem}>
          <Checkbox
            status={artCategories.books ? 'checked' : 'unchecked'}
            onPress={() => setArtCategories({...artCategories, books: !artCategories.books})}
          />
          <Text>Books</Text>
        </View>

        <View style={styles.checkboxItem}>
          <Checkbox
            status={artCategories.comics ? 'checked' : 'unchecked'}
            onPress={() => setArtCategories({...artCategories, comics: !artCategories.comics})}
          />
          <Text>Comics & Manga</Text>
        </View>

        <View style={styles.checkboxItem}>
          <Checkbox
            status={artCategories.animation ? 'checked' : 'unchecked'}
            onPress={() => setArtCategories({...artCategories, animation: !artCategories.animation})}
          />
          <Text>Animation</Text>
        </View>
      </View>

      <Button
        mode="contained"
        onPress={saveSettings}
        loading={loading}
        disabled={loading}
        style={styles.saveButton}
      >
        Save Settings
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButton: {
    margin: 20,
  },
});
