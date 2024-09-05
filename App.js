import React, { useState, useEffect } from 'react';
import { View, Animated, Dimensions, StyleSheet, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import AnimatedLogo from './components/AnimatedLogo';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';
import WaitlistForm from './components/WaitlistForm';
import BackgroundImage from './components/BackgroundImage';
import Loading from './components/Loading';
import SubmissionStatusModal from './components/SubmissionStatusModal'; // Import the new modal component

// Load Koulen font
const loadFonts = async () => {
  await Font.loadAsync({
    Koulen: require('./assets/fonts/Koulen-Regular.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [waitlistModalVisible, setWaitlistModalVisible] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // State for submission status modal
  const [slideAnimLeft] = useState(new Animated.Value(-Dimensions.get('window').width)); // For About modal
  const [slideAnimRight] = useState(new Animated.Value(Dimensions.get('window').width)); // For Waitlist modal

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  const openAboutModal = () => {
    setAboutModalVisible(true);
    Animated.timing(slideAnimLeft, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeAboutModal = () => {
    Animated.timing(slideAnimLeft, {
      toValue: -Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setAboutModalVisible(false));
  };

  const openWaitlistModal = () => {
    setWaitlistModalVisible(true);
    Animated.timing(slideAnimRight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeWaitlistModal = () => {
    Animated.timing(slideAnimRight, {
      toValue: Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setWaitlistModalVisible(false));
  };

  const handleSubmissionResult = (success) => {
    setWaitlistModalVisible(false);
    setSubmissionStatus(success ? 'success' : 'failure');

    if (success) {
      setTimeout(() => {
        setSubmissionStatus(null);
      }, 2000);
    }
  };

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <BackgroundImage />
        <AnimatedLogo />
      </View>
      <Footer openAboutModal={openAboutModal} openWaitlistModal={openWaitlistModal} />
      <AboutModal
        visible={aboutModalVisible}
        onClose={closeAboutModal}
        slideAnim={slideAnimLeft}
      />
      <WaitlistForm
        visible={waitlistModalVisible}
        onClose={closeWaitlistModal}
        onSubmit={handleSubmissionResult} // Pass the handler to WaitlistForm
        slideAnim={slideAnimRight}
      />
      {submissionStatus && (
        <SubmissionStatusModal
          status={submissionStatus}
          onClose={() => setSubmissionStatus(null)}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    marginTop: 100,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
