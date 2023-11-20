import React, { useContext, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, Animated, Easing, Alert, Button } from 'react-native';

import mealIcon from "@assets/meal.png";
import addIcon from "@assets/add.png";
import removeIcon from "@assets/remove.png";
import editMealIcon from "@assets/editMeal.png";

import { AuthenticatedUserContext } from '@context/AuthenticationContext';

import { styles } from './styles';
import { Food, TMeals, } from 'src/@types/Food';
import FoodSearchPopup from '@components/FoodSearchPopup';

const Menu = ({ meal, onRemoveFood, onAddFood, titleSize, detailsOpacity }: {
  meal: TMeals,
  onRemoveFood: (userId: string, mealId: string, foodData: Food) => Promise<boolean>,
  onAddFood: (userId: string, mealId: string, newFood: Food) => Promise<boolean>,
  titleSize: Animated.Value,
  detailsOpacity: Animated.Value
}) => {
  const { currentUser } = useContext(AuthenticatedUserContext);

  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleRemoveFood = (newFood: Food) => {
    onRemoveFood(currentUser?.uid!, meal.id!, newFood);
  };

  return (
    <View style={{ flex: 1, width: 300 }}>
      <Animated.Text style={[styles.cardTitle, { fontSize: titleSize }]}>
        {meal.title}
      </Animated.Text>
      {
        meal.foods.map((food, index) => (
          <View key={index}>
            <View key={index} style={styles.foodRow}>
              <View style={{ flexDirection: 'row', width: '50%' }}>
                <Animated.Text style={[styles.text, { fontSize: 12, opacity: detailsOpacity }]}>
                  {food.name}
                </Animated.Text>
              </View>
              <View style={{ flexDirection: 'row', width: '15%' }}>
                <Animated.Text style={[styles.text, styles.subText, { marginLeft: 10, fontSize: 12, opacity: detailsOpacity }]}>
                  {food.quantity}{food.quantityUnit}
                </Animated.Text>
              </View>

              <View style={{ flexDirection: 'row', width: '25%', justifyContent: 'flex-end'  }}>
                <Animated.Text style={[styles.text, { fontSize: 12, opacity: detailsOpacity }]}>
                  {food.kcal} Kcal
                </Animated.Text>
              </View>
              <View style={{ flexDirection: 'row', width: '10%', justifyContent: 'flex-end' }}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => {
                    const newFood: Food = {
                      name: food.name!,
                      kcal: food.kcal!,
                      protein: food.protein!,
                      carbohydrate: food.carbohydrate!,
                      fat: food.fat!,
                      quantity: food.quantity!,
                      quantityUnit: "un",
                    };
                    console.log(newFood);
                    handleRemoveFood(newFood);
                  }}
                >
                  <Animated.Image source={removeIcon} style={[styles.myIcon, { width: 18, height: 18, opacity: detailsOpacity }]} />
                </TouchableOpacity>
              </View>

            </View>
            <Animated.View style={{ height: 5, borderBottomWidth: 1, borderBottomColor: '#DFD8C8', opacity: detailsOpacity }} />
          </View>
        ))
      }
      <TouchableOpacity
        // onPress={handleAddFood}
        onPress={openPopup}
        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
        <Animated.Image source={addIcon} style={[styles.myIcon, { width: 42, height: 42, opacity: detailsOpacity }]} />
        <FoodSearchPopup isVisible={isPopupVisible} onClose={closePopup} onAddFood={onAddFood} meal={meal} />
      </TouchableOpacity>
    </View >
  )
};


export function Card({ meal, onRemoveFood, onAddFood }: {
  meal: TMeals,
  onRemoveFood: (userId: string, mealId: string, foodData: Food) => Promise<boolean>,
  onAddFood: (userId: string, mealId: string, newFood: Food) => Promise<boolean>,
}) {
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
        <Menu meal={meal} onRemoveFood={onRemoveFood} onAddFood={onAddFood} titleSize={titleSize} detailsOpacity={detailsOpacity} />
      </TouchableOpacity>
    </View>
  );
}