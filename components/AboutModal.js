import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutModal({ visible, onClose, slideAnim }) {
  return (
    <Animated.View style={[styles.modalContent, { transform: [{ translateX: slideAnim }] }]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.modalHeader}>
        <Text style={styles.heading}>WHAT IS</Text>
        <Image
          source={require('../assets/beau-logo.png')} // Replace with your logo image path
          style={styles.logo}
        />
      </View>
      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraph}>
          BEAU isn’t just an app: it’s where makeup meets innovation. For makeup artists (MUAs), BEAU offers a suite of powerful tools to streamline business and give MUAs a stage to showcase and redefine beauty.
          {"\n\n"}
          BEAU 💓 its users. Beyond booking services, we connect users to MUAs whose styles and choices resonate with their own. Beauty on BEAU is about choice, inspiration, and a celebration of different expressions. BEAU is where MUAs and users collaborate to redefine beauty while embracing art, authenticity, and creativity.
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20, // Space between heading and logo
  },
  logo: {
    width: 326, // Logo width
    height: 80, // Logo height
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Space between heading and logo
    fontFamily: 'Koulen',
  },
  paragraphContainer: {
    width: '100%', // Full width for the container
    paddingHorizontal: 20, // Horizontal padding for equal margins on both sides
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'justify', // Justify text alignment
    lineHeight: 24, // Line height for readability
    textAlignVertical: 'center', // Vertically center text in its container
    fontFamily: 'Koulen',
  },
});
