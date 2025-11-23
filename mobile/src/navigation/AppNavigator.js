import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/home/HomeScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import ConversationScreen from '../screens/chat/ConversationScreen';
import RecommendationsScreen from '../screens/recommendations/RecommendationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import FeedScreen from '../screens/social/FeedScreen';
import SavedScreen from '../screens/recommendations/SavedScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: 'AI Art Discovery' }}
      />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatList"
        component={ChatScreen}
        options={{ title: 'Conversations' }}
      />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={{ title: 'Chat' }}
      />
    </Stack.Navigator>
  );
};

const RecommendationsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecommendationsList"
        component={RecommendationsScreen}
        options={{ title: 'Recommendations' }}
      />
      <Stack.Screen
        name="Saved"
        component={SavedScreen}
        options={{ title: 'Saved Items' }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chat' : 'chat-outline';
          } else if (route.name === 'Feed') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Discover" component={RecommendationsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return user ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
