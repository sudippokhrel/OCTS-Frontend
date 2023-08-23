import { getFirestore, doc, getDoc } from 'firebase/firestore';


const getUserProgram = async (uid) => {
  try {
    // Reference the Firestore 'users' collection
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);

    // Retrieve the user document using the UID
    const userDoc = await getDoc(userRef);

    // Check if the document exists
    if (userDoc.exists()) {
      // Retrieve the program from the document data
      const program = userDoc.data().program;

      // Return the user's program
      return program;
    } else {
      // Handle the case where the user document does not exist
      console.log('User document does not exist');
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during the retrieval
    console.error('Error retrieving user program:', error);
    return null;
  }
};

export default getUserProgram;



