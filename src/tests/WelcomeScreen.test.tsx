import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { View, Text, StyleSheet } from 'react-native';

// Simple Welcome Screen Component for testing
const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GigGrid</Text>
      <Text style={styles.subtitle}>
        Place your Uizard assets in reference/welcome-screen/ to generate the actual screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

describe('WelcomeScreen', () => {
  it('should render welcome message', () => {
    render(<WelcomeScreen />);
    expect(screen.getByText('Welcome to GigGrid')).toBeTruthy();
  });

  it('should display instructions for Uizard assets', () => {
    render(<WelcomeScreen />);
    expect(screen.getByText(/Place your Uizard assets/)).toBeTruthy();
    expect(screen.getByText(/reference\/welcome-screen/)).toBeTruthy();
  });
});
