import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const getPrograms = async () => {
try{
  const programsRef = collection(db, 'programs');
  const querySnapshot = await getDocs(programsRef);
  
  const programs = querySnapshot.docs.map((doc)  => ({
    id: doc.id,
    ...doc.data(),
  }));

  return programs;
}catch (error) {
    console.log('Error retrieving programs', error.message);
    return null;
}

};

export {getPrograms};
