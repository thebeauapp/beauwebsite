import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, CheckBox, Modal, Pressable } from "react-native";
import { db } from "../firebase"; 
import { collection, addDoc } from "firebase/firestore";

const WaitlistScreen = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const handleSubmit = async () => {
    if (email && phoneNumber && isSubscribed) {
      try {
        await addDoc(collection(db, "users"), {
          email: email,
          phoneNumber: phoneNumber,
          isSubscribed: isSubscribed,
          createdAt: new Date(),
        });

        setModalVisible(true); // Show the modal
        setEmail("");
        setPhoneNumber("");
        setIsSubscribed(false);
      } catch (error) {
        console.error("Error adding document: ", error);
        Alert.alert("Error", "There was an error submitting your information. Please try again.");
      }
    } else {
      Alert.alert("Warning", "Please fill in all fields and agree to notifications.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join the beau Waitlist</Text>
      <Text style={styles.description}>
        beau isn’t just an app: it's a powerhouse for make-up artists (MUAs) and users.
        We bridge the gap between artists and make-up lovers (you!) so you can navigate 
        the beauty landscape with confidence.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSubscribed}
          onValueChange={setIsSubscribed}
        />
        <Text style={styles.checkboxLabel}>I allow email and text notifications from beau</Text>
      </View>
      <Button title="Submit" onPress={handleSubmit} />

      {/* Modal for confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Success! You have been added to the waitlist.</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default WaitlistScreen;
