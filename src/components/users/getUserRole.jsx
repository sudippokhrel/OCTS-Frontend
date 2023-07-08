import { getFirestore, doc, getDoc } from 'firebase/firestore';


const getUserRole = async (uid) => {
  try {
    // Reference the Firestore 'users' collection
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);

    // Retrieve the user document using the UID
    const userDoc = await getDoc(userRef);

    // Check if the document exists
    if (userDoc.exists()) {
      // Retrieve the role from the document data
      const role = userDoc.data().role;

      // Return the user's role
      return role;
    } else {
      // Handle the case where the user document does not exist
      console.log('User document does not exist');
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during the retrieval
    console.error('Error retrieving user role:', error);
    return null;
  }
};

export default getUserRole;



