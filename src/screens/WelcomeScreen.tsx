import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const WelcomeScreen = () => {
  const handleLogin = () => {
    Alert.alert('Welcome!', 'Login functionality will be implemented next');
  };

  const handleSocialConnect = () => {
    Alert.alert('Social Connect', 'Social authentication will be implemented next');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.brandingContainer}>
            <Text style={styles.appTitle}>GigGrid</Text>
            <Text style={styles.appTagline}>Your music career starts here</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentSection}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Welcome to GigGrid</Text>
            <Text style={styles.welcomeSubtitle}>
              Connect with venues, book gigs, and grow your music career
            </Text>
          </View>

          {/* CTA Buttons */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>

            <View style={styles.socialConnectContainer}>
              <Text style={styles.socialConnectText}>or connect with</Text>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleSocialConnect}
                  activeOpacity={0.8}
                >
                  <Text style={styles.socialIconPlaceholder}>🔗</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'System',
    letterSpacing: 1,
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: '#a3a3a3',
    fontFamily: 'System',
    textAlign: 'center',
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'System',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#a3a3a3',
    fontFamily: 'System',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  ctaContainer: {
    alignItems: 'center',
  },
  primaryButton: {
    width: width - 48,
    height: 48,
    backgroundColor: '#22c55e',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
  socialConnectContainer: {
    alignItems: 'center',
  },
  socialConnectText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'System',
    marginBottom: 16,
    opacity: 0.7,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  socialIconPlaceholder: {
    fontSize: 20,
    color: '#ffffff',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
  },
  footerText: {
    color: '#666666',
    fontSize: 12,
    fontFamily: 'System',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default WelcomeScreen;
