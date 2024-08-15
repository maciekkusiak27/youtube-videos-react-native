import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

import WelcomeComponent from './components/WelcomeComponent';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import VideoDetailsScreen from './screens/VideoDetailsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconSource;

        if (route.name === 'Home') {
          iconSource = require('./assets/icons/home-icon.svg');
        } else if (route.name === 'Search') {
          iconSource = require('./assets/icons/search-icon.svg');
        }

        return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
      },
      tabBarActiveTintColor: '#2D3440',
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarStyle: {
        backgroundColor: '#8D99AE', 
        paddingVertical:10
      },
      tabBarLabelStyle: {
        fontSize: 16,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeComponent} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="VideoDetails" component={VideoDetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: '#2D3440',
  },
});

export default App;
