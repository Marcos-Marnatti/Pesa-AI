import { db } from '@config/firebase';
import { serverTimestamp, collection, addDoc, getDocs, query } from 'firebase/firestore';
import { Diet } from 'src/@types/Diet';

export function handleSaveUserDiet(user: string, uid: string, diet: string) {
  const dietsCollectionRef = collection(db, `users/${uid}/diets`);

  addDoc(dietsCollectionRef, {
    user,
    diet,
    created_at: serverTimestamp(),
  })
    .then(() => {
      console.log('Diet added!');
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function handleGetUserDiet(uid: string) {
  const dietsCollectionRef = collection(db, `users/${uid}/diets`);
  try {
    const q = query(dietsCollectionRef);
    const querySnapshot = await getDocs(q);

    const userDiets: Diet[] = [];
    querySnapshot.forEach((doc) => {
      userDiets.push({ id: doc.id, created_at: doc.data().created_at.toDate(), diet: doc.data().diet, user: doc.data().user });
    });

    // console.log(userDiets)
    return userDiets;
  } catch (error) {
    console.error('Error fetching user diets:', error);
    return [];
  }
};