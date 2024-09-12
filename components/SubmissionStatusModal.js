import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const SubmissionStatusModal = ({ status, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modal, status === 'success' ? styles.success : styles.failure]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            {status === 'success' ? 'Successfully Submitted!' : 'Submission Failed!'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modal: {
    width: '70%', // Decreased width
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10, // Adds shadow for better visibility
  },
  success: {
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 2,
  },
  failure: {
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 2,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'black',
  },
});

export default SubmissionStatusModal;
