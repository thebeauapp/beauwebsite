import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button, Animated, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addToWaitlist } from '../utils/firebaseUtils'; // Adjust the path if necessary

export default function WaitlistForm({ visible, onClose, onSubmit, slideAnim }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [clientType, setClientType] = useState(''); // Track selected client type
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async () => {
    const data = {
      name,
      email,
      phone,
      clientType,
      agreedToTerms,
    };

    const result = await addToWaitlist(data);

    if (result.success) {
      // Clear form fields
      setName('');
      setEmail('');
      setPhone('');
      setClientType('');
      setAgreedToTerms(false);
      // Pass the submission result back to App.js
      onSubmit(true);
    } else {
      console.error('Failed to add to waitlist', result.error);
      onSubmit(false);
    }
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://www.freeprivacypolicy.com/live/bf72d9bf-0000-4458-a5ee-cf3a50ace19d'); // Replace with your Privacy Policy URL
  };

  if (!visible) return null; // Only render the form if visible

  return (
    <Animated.View style={[styles.modalContentRight, { transform: [{ translateX: slideAnim }] }]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="#000" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.formTitle}>Sign up to stay updated and join the waitlist!</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setClientType('makeupArtist')}
          >
            <View style={[styles.radioButton, clientType === 'makeupArtist' && styles.selectedRadio]} />
            <Text style={styles.radioLabel}>Makeup Artist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setClientType('client')}
          >
            <View style={[styles.radioButton, clientType === 'client' && styles.selectedRadio]} />
            <Text style={styles.radioLabel}>Client</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} style={styles.checkbox}>
            {agreedToTerms && <Ionicons name="checkmark" size={20} color="#000" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            By submitting my information, I agree to receive personalized updates and marketing messages about Beau. I understand the
            <Text style={styles.link} onPress={openPrivacyPolicy}> Privacy Policy</Text>.
          </Text>
        </View>
        <Button title="Submit" onPress={handleSubmit} disabled={!agreedToTerms} />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  modalContentRight: {
    position: 'absolute',
    top: 0,
    right: 0,
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
    left: 10,
    zIndex: 1,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  formTitle: {
    fontSize: 24, // Increased heading size
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  radioContainer: {
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedRadio: {
    backgroundColor: '#000', // Color for selected radio button
  },
  radioLabel: {
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    flex: 1,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
