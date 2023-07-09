import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const getColleges = async () => {
try{
  // Reference the Firestore collection
  const collegesRef = collection(db, 'colleges');

  // Retrieve the documents in the collection
  const querySnapshot = await getDocs(collegesRef);
  
  // Extract the collegeName and collegeAddress fields from each document
  const colleges = querySnapshot.docs.map(doc => ({
    id: doc.id,
    collegeName: doc.data().collegeName,
    collegeAddress: doc.data().collegeAddress,
  }));

  return colleges;
}catch (error) {
    console.log('Error retrieving colleges', error.message);
    return null;
}
};

export default getColleges;
