import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import mealsIcon from "@assets/meal.png";
import removeIcon from "@assets/remove.png";
import addIcon from "@assets/add.png";

import { Card } from "@components/MealCard";
import { BottomTab } from "@components/BottomTab";

import { StackTypes } from 'src/@types/StackNavigator';
import { AuthenticatedUserContext } from '@context/AuthenticationContext';
import { Food, TMeals } from 'src/@types/Food';
import { addFoodToMeal, addMeal, deleteFoodFromMeal, deleteMeal, fetchUserMeals } from '@services/reqFirestore';

import { styles } from './styles';

export function Meals() {
  const navigation = useNavigation<StackTypes>();
  const [meals, setMeals] = useState<TMeals[]>([]);

  const { currentUser } = useContext(AuthenticatedUserContext);

  async function handleGetMeals() {
    console.log('entrei')
    await fetchUserMeals(currentUser?.uid!)
      .then((response) => setMeals(response));
  };

  useEffect(() => {
    handleGetMeals();
  }, []);


  const handleRemoveMeal = (userId: string, refTitle: string, mealId: string) => {
    Alert.alert('Remover', `Remover ${refTitle}?`, [
      {
        text: 'Sim',
        onPress: () => {
          deleteMeal(userId, mealId)
            .then(() => handleGetMeals());
          Alert.alert(`Item Removido!`);
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      },
    ])
  };

  const handleAddFoodToMeal = (userId: string, mealId: string, newFood: Food): Promise<boolean> => {
    return addFoodToMeal(userId, mealId, newFood)
      .then(() => {
        handleGetMeals();
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  const handleRemoveFoodFromMeal = (userId: string, mealId: string, food: Food): Promise<boolean> => {
    return deleteFoodFromMeal(userId, mealId, food)
      .then(() => {
        handleGetMeals();
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  const handleAddMeal = () => {
    const newMeal: TMeals = { title: `Refeição ${meals.length + 1}`, foods: [] };
    addMeal(currentUser?.uid!, newMeal)
      .then(() => {
        handleGetMeals();
        return true;
      })
      .catch

  };

  return (

    <View style={styles.screenContainer}>
      <View style={{ height: '10%' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={.8}
            style={[styles.button, { backgroundColor: '#20BF55', width: '55%' }]}
            onPress={handleAddMeal}
          >
            <Image source={addIcon} style={{ width: 52, height: 52, left: -15, }} />
            <Text style={styles.textButton}>
              Nova refeição
            </Text>
          </TouchableOpacity >
        </View>
      </View>

      <View style={styles.middleScreen}>
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <View style={{ width: '55%', flexDirection: 'row', marginTop: 10 }}>
              <Image source={mealsIcon} style={styles.myIcon} />
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 28 }]}>Refeições</Text>
              </View>
            </View>
            <View style={{ height: '2%', width: '80%', borderBottomWidth: 1, borderBottomColor: '#DFD8C8', alignSelf: 'center', marginTop: 10 }} />
          </View>


        </View>
        <View style={{ marginHorizontal: '6%', height: '70%' }}>
          <ScrollView style={styles.cardContainer} horizontal showsHorizontalScrollIndicator={false}>
            {meals.length === 0 ?
              (<Text style={[styles.textButton, { color: 'black', alignSelf: 'center', justifyContent: 'center' }]}> Nenhuma refeição cadastrada.</Text>)
              :
              (meals.map((meal) => (
                <View key={meal.id} style={{ flex: 1 }}>
                  <Card key={meal.id} meal={meal} onRemoveFood={handleRemoveFoodFromMeal} onAddFood={handleAddFoodToMeal} />
                  <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'center', marginHorizontal: '7%' }}>
                    <TouchableOpacity
                      activeOpacity={.8}
                      onPress={() => handleRemoveMeal(currentUser?.uid!, meal.title, meal.id!)}
                      style={{ height: 60, borderRadius: 26, width: '60%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F44336' }}>
                      <Image source={removeIcon} style={[styles.myIcon, { width: 52, height: 52, left: -15, }]} />
                      <Text style={styles.textButton}>
                        Deletar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>)
              ))
            }
          </ScrollView>
        </View>
      </View>
      <BottomTab />
    </View >
  );
}