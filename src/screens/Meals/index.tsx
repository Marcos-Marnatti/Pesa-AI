import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from "@routes/stack.route";
import { Card } from "@components/MealCard";
import { BottomTab } from "@components/BottomTab";

import mealsIcon from "@assets/meal.png";
import searchIcon from "@assets/search.png";
import editMealIcon from "@assets/editMeal.png";
import removeIcon from "@assets/remove.png";
import addIcon from "@assets/add.png";

import { styles } from './styles';
import { TMeals } from 'src/@types/Food';
import { dinner, lunch } from './meals';


export function Meals() {
  const navigation = useNavigation<StackTypes>();
  const [meals, setMeals] = useState<TMeals[]>([lunch, dinner]);

  async function handleDeleteMeal(mealTitle: string) {
    Alert.alert('Remover', `Remover ${mealTitle}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setMeals(meals.filter(meal => meal.title !== mealTitle));
          Alert.alert(`Refeição Removida!`)
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      },
    ])
  };

  async function handleAddMeal() {
    const newMeal: TMeals = {
      title: `Refeição ${meals.length + 1}`,
      foods: []
    };
    setMeals(prevState => [...prevState, newMeal]);
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
            {meals.length > 0 ?
              (meals.map((meal, index) => (
                <View key={index} style={{ flex: 1 }}>
                  <Card key={index} meal={meal} />
                  <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '7%' }}>
                    <TouchableOpacity onPress={() => handleDeleteMeal(meal.title)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                      <Image source={removeIcon} style={[styles.myIcon, { width: 42, height: 42 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={ }
                      style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                      <Image source={addIcon} style={[styles.myIcon, { width: 52, height: 52 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                      <Image source={editMealIcon} style={[styles.myIcon, { width: 48, height: 48 }]} />
                    </TouchableOpacity>
                  </View>
                </View>)
              )) :
              (<Text style={[styles.textButton, { color: 'black', alignSelf: 'center', justifyContent: 'center' }]}> Nenhuma refeição cadastrada.</Text>)
            }
          </ScrollView>
        </View>

      </View>
      <BottomTab />
    </View >
  );
}