import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Footer({ openAboutModal, openWaitlistModal }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.buttonLeft} onPress={openAboutModal}>
        <Text style={styles.buttonText}>ABOUT</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/icons/tt.png')} style={styles.icon} />
        <Image source={require('../assets/icons/ig.png')} style={styles.icon} />
        <Image source={require('../assets/icons/x.png')} style={styles.icon} />
      </View>
      <TouchableOpacity style={styles.buttonRight} onPress={openWaitlistModal}>
        <Text style={styles.buttonText}>JOIN WAITLIST</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonLeft: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonRight: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});
