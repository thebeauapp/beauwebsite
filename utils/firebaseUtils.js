// Import necessary functions
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig'; // Adjust the path as necessary

export const addToWaitlist = async (data) => {
  const { email } = data;
  
  // Reference to your Firestore collection
  const waitlistRef = collection(firestore, 'waitlist_users');

  try {
    // Check for existing email
    const q = query(waitlistRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: false, error: 'This email is already on the waitlist.' };
    }

    // Add the new entry if no duplicate exists
    await addDoc(waitlistRef, data);

    return { success: true };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { success: false, error: 'An error occurred. Please try again.' };
  }
};
