import React, { useRef } from 'react';
import { View, TouchableOpacity, Image, Animated, Easing } from 'react-native';

import mealIcon from "@assets/meal.png";
import addIcon from "@assets/add.png";
import editMealIcon from "@assets/editMeal.png";

import { styles } from './styles';
import { TMeals } from 'src/@types/Food';


const Menu = ({ meal, titleSize, detailsOpacity }: { meal: TMeals, titleSize: Animated.Value, detailsOpacity: Animated.Value }) => {
  return (
    <View style={{ flex: 1, width: 300 }}>
      <Animated.Text style={[styles.cardTitle, { fontSize: titleSize }]}>
        {meal.title}
      </Animated.Text>
      {
        meal.foods.map((food, index) => (
          <View key={index} >
            <View key={index} style={styles.foodRow}>
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
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Animated.Image source={editMealIcon} style={[styles.myIcon, { width: 24, height: 24, opacity: detailsOpacity }]} />
                </TouchableOpacity>
              </View>
            </View>
            <Animated.View style={{ height: 5, borderBottomWidth: 1, borderBottomColor: '#DFD8C8', opacity: detailsOpacity }} />
          </View>
        ))
      }
    </View >
  )
};


export function Card({ meal }: { meal: TMeals }) {
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
        <Menu meal={meal} titleSize={titleSize} detailsOpacity={detailsOpacity} />
        <TouchableOpacity
          // onPress={ }
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Animated.Image source={addIcon} style={[styles.myIcon, { width: 42, height: 42, opacity: detailsOpacity }]} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}