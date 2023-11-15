import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, Animated, Easing, Alert } from 'react-native';

import mealIcon from "@assets/meal.png";
import addIcon from "@assets/add.png";
import removeIcon from "@assets/remove.png";
import editMealIcon from "@assets/editMeal.png";

import { styles } from './styles';
import { Food, TMeals, } from 'src/@types/Food';

const Menu = ({ meal, onRemoveFood, onAddFood, onEditFood, titleSize, detailsOpacity }: { meal: TMeals, onRemoveFood: (mealTitle: string, foodName: string) => void, onAddFood: (mealTitle: string, newFood: Food) => void, onEditFood: (mealTitle: string, foodName: string, newQuantity: number) => void, titleSize: Animated.Value, detailsOpacity: Animated.Value }) => {

  const handleRemoveFood = (mealTitle: string, foodName: string) => {
    onRemoveFood(mealTitle, foodName);
  };

  const handleAddFood = (mealTitle: string,  // newFood: Food
  ) => {
    const newFood: Food = {
      name: "Maçã",
      kcal: 50,
      quantity: 1,
      quantityUnit: "un",
    };
    onAddFood(mealTitle, newFood);
  };

  const handleEditFoodQuantity = (mealTitle: string, foodName: string, newQuantity: number) => {
    onEditFood(mealTitle, foodName, newQuantity);
  };



  return (
    <View style={{ flex: 1, width: 300 }}>
      <Animated.Text style={[styles.cardTitle, { fontSize: titleSize }]}>
        {meal.title}
      </Animated.Text>
      {
        meal.foods.map((food, index) => (
          <View key={index} >
            <View key={index} style={styles.foodRow}>
              <TouchableOpacity
                onPress={() => handleEditFoodQuantity(meal.title, food.name, food.quantity + 1)}
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Animated.Image source={editMealIcon} style={[styles.myIcon, { width: 24, height: 24, opacity: detailsOpacity }]} />
              </TouchableOpacity>
              <Animated.Text style={[styles.text, { fontSize: 18, opacity: detailsOpacity }]}>
                {food.name}
              </Animated.Text>
              <View style={[styles.foodRow, { marginTop: 0, width: '55%' }]}>
                <Animated.Text style={[styles.text, styles.subText, { fontSize: 14, opacity: detailsOpacity }]}>
                  {food.quantity}{food.quantityUnit}
                </Animated.Text>
                <Animated.Text style={[styles.text, { fontSize: 18, opacity: detailsOpacity }]}>
                  {food.kcal} Kcal
                </Animated.Text>
                <TouchableOpacity
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => handleRemoveFood(meal.title, food.name)}
                >
                  <Animated.Image source={removeIcon} style={[styles.myIcon, { width: 24, height: 24, opacity: detailsOpacity }]} />
                </TouchableOpacity>
              </View>
            </View>
            <Animated.View style={{ height: 5, borderBottomWidth: 1, borderBottomColor: '#DFD8C8', opacity: detailsOpacity }} />
          </View>
        ))
      }
      <TouchableOpacity
        onPress={() => handleAddFood(meal.title)}
        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
        <Animated.Image source={addIcon} style={[styles.myIcon, { width: 42, height: 42, opacity: detailsOpacity }]} />
      </TouchableOpacity>
    </View >
  )
};


export function Card({ meal, onRemoveFood, onAddFood, onEditFood }: { meal: TMeals, onRemoveFood: (mealTitle: string, foodName: string) => void, onAddFood: (mealTitle: string, newFood: Food) => void, onEditFood: (mealTitle: string, foodName: string, newQuantity: number) => void }) {
  const cardImageContainerSize = useRef(new Animated.Value(350)).current;
  const cardImageContainerBorder = useRef(new Animated.Value(20)).current;
  const cardImageContainerTop = useRef(new Animated.Value(0)).current;
  const titleSize = useRef(new Animated.Value(1)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;


  const handleOnCardPress = () => {
    Animated.parallel([
      Animated.timing(cardImageContainerSize, {
        toValue: 150,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: false
      }),
      Animated.timing(cardImageContainerBorder, {
        toValue: 75,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: false
      }),
      Animated.timing(cardImageContainerTop, {
        toValue: -50,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: false
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(titleSize, {
          toValue: 30,
          duration: 500,
          easing: Easing.elastic(1),
          useNativeDriver: false
        }),
        Animated.timing(detailsOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.elastic(1),
          useNativeDriver: false
        }),
      ]).start();
    }, 100);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnCardPress} style={styles.cardContainer} activeOpacity={.9}>
        <Animated.View style={[styles.cardImageContainer, {
          height: cardImageContainerSize,
          width: cardImageContainerSize,
          borderRadius: cardImageContainerBorder,
          top: cardImageContainerTop,
        }]}>
          <Image source={mealIcon} style={styles.cardImage} />
        </Animated.View>
        <Menu meal={meal} onRemoveFood={onRemoveFood} onAddFood={onAddFood} onEditFood={onEditFood} titleSize={titleSize} detailsOpacity={detailsOpacity} />
      </TouchableOpacity>
    </View>
  );
}