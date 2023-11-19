import { serverTimestamp, collection, addDoc, deleteDoc, updateDoc, getDocs, query, doc, arrayUnion, arrayRemove, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@config/firebase';

import { Diet } from 'src/@types/Diet';
import { Food, TMeals } from 'src/@types/Food';

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
};

export async function handleGetUserDiet(uid: string) {
  const dietsCollectionRef = collection(db, `users/${uid}/diets`);
  try {
    const q = query(dietsCollectionRef);
    const querySnapshot = await getDocs(q);

    const userDiets: Diet[] = [];
    querySnapshot.forEach((doc) => {
      userDiets.push({ id: doc.id, created_at: doc.data().created_at.toDate(), diet: doc.data().diet, user: doc.data().user });
    });
    return userDiets;
  } catch (error) {
    console.error('Error fetching user diets:', error);
    return [];
  }
};

export async function addMeal(userId: string, mealData: TMeals) {
  const mealsCollectionRef = collection(db, `users/${userId}/meals`);

  try {
    const newMealRef = await addDoc(mealsCollectionRef, {
      ...mealData,
    });
    console.log('Meal added!');
    return newMealRef.id;
  } catch (error) {
    console.error('Error adding meal:', error);
    return null;
  }
};


export async function deleteMeal(userId: string, mealId: string) {
  const mealRef = doc(db, `users/${userId}/meals/${mealId}`);

  try {
    await deleteDoc(mealRef);
    return true;
  } catch (error) {
    console.error('Error deleting meal:', error);
    return false;
  }
};


export async function fetchUserMeals(userId: string) {
  const mealsCollectionRef = collection(db, `users/${userId}/meals`);

  try {
    const q = query(mealsCollectionRef);
    const querySnapshot = await getDocs(q);

    const userMeals: TMeals[] = [];
    querySnapshot.forEach((doc) => {
      userMeals.push({ title: doc.data().title, foods: doc.data().foods, id: doc.id });
    });

    return userMeals;
  } catch (error) {
    console.error('Error fetching user meals:', error);
    return [];
  }
};

export async function addFoodToMeal(userId: string, mealId: string, foodData: Food) {
  const mealRef = doc(db, `users/${userId}/meals/${mealId}`);

  try {
    await updateDoc(mealRef, {
      foods: arrayUnion(foodData), 
    });
    return true; 
  } catch (error) {
    console.error('Error adding food to meal:', error);
    return false; 
  }
};

export async function deleteFoodFromMeal(userId: string, mealId: string, foodData: Food) {
  const mealRef = doc(db, `users/${userId}/meals/${mealId}`);

  try {
    await updateDoc(mealRef, {
      foods: arrayRemove(foodData),
    });
    return true;
  } catch (error) {
    console.error('Error deleting food from meal:', error);
    return false;
  }
};