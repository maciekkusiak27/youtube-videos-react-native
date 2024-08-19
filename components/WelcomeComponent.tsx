import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors } from '../constants/colors';

const WelcomeComponent = ({ navigation }: any) => {
  const handlePress = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.svg')} style={styles.logo} />
      <Image source={require('../assets/app-icon.svg')} />
      <View style={styles.welcomeContent}>
        <Text style={styles.welcomeText}>
          Welcome to the best YouTube-based learning application.
        </Text>
        <TouchableOpacity style={styles.welcomeButton} onPress={handlePress}>
          <Text style={styles.buttonText}>Log in as guest</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          <Text>By continuing you agree with </Text>
          <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/terms')}>
            Terms and Conditions
          </Text>
          <Text> and </Text>
          <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/privacy')}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary, 
    padding: 20,
  },
  welcomeButton: {
    backgroundColor: Colors.secondary, 
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center'
  },
  logo: {
    marginTop: 32,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white, 
    marginVertical: 20,
  },
  termsText: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  link: {
    color: Colors.secondary, 
    textDecorationLine: 'underline',
  },
  welcomeContent: {
    marginBottom: 32,
  },
});

export default WelcomeComponent;
