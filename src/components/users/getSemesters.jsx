import { collection, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const getSemesters = async () => {
try{ 
  const semestersRef = collection(db, 'semesters');
  const querySnapshot = await getDoc(semestersRef);
  
  const semesters = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return semesters;
  }catch (error) {
    console.log('Error retrieving semesters', error.message);
    return null;
}
};

export default getSemesters;
