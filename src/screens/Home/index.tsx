import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { DietHistoric } from "@components/DietHistoric";
import { Header } from "@components/Header";
import { DietBanner } from "@components/DietBanner";
import { BottomTab } from "@components/BottomTab";

import { StackTypes } from "src/@types/StackNavigator";
import { AuthenticatedUserContext } from "../../context/AuthenticationContext";
import { CaloriesCount } from "@components/CaloriesCount";

import { styles } from './styles';
import { fetchUserMeals } from "@services/reqFirestore";

export function Home() {
  const navigation = useNavigation<StackTypes>();
  const { currentUser, userData, logout, valueChanged } = useContext(AuthenticatedUserContext);

  const [consumedCalories, setConsumedCalories] = useState(0);
  const [consumedProtCalories, setConsumedProtCalories] = useState(0);
  const [consumedCarbCalories, setConsumedCarbCalories] = useState(0);
  const [consumedFatCalories, setConsumedFatbCalories] = useState(0);
  const basalMetabolicRate = Math.trunc(userData?.basalMetabolicRate!);

  const handleMacros = async () => {
    const response = await fetchUserMeals(currentUser?.uid!);
    let caloriesSum = 0;
    let proteinSum = 0;
    let carbsSum = 0;
    let fatSum = 0;

    response.map((meal) => {
      meal.foods.map((food) => {
        caloriesSum += food.kcal;
        proteinSum += food.protein! * 4;
        carbsSum += food.carbohydrate! * 4;
        fatSum += food.fat!* 9;
      });
    });
    setConsumedCalories(caloriesSum);
    setConsumedProtCalories(proteinSum);
    setConsumedCarbCalories(carbsSum);
    setConsumedFatbCalories(fatSum);
  };

  useEffect(() => {
    handleMacros();
  }, [valueChanged])

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Header onPress={logout} userName={currentUser?.displayName!} />
      </View >
      <View style={styles.middleScreen}>
        <View style={styles.screen}>
          <DietBanner navigation={navigation} />
        </View>
        <View style={styles.dietScreen}>
          <DietHistoric navigation={navigation} />
        </View>
        <View style={{ height: 25, width: '90%', borderBottomWidth: 1, borderBottomColor: '#DFD8C8', alignSelf: 'center' }} />
        <View style={styles.caloriesContainer}>
          <CaloriesCount basalMetabolicRate={basalMetabolicRate} consumedCalories={consumedCalories} consumedCarbCalories={consumedCarbCalories} consumedFatCalories={consumedFatCalories} consumedProtCalories={consumedProtCalories} />
        </View>
      </View>
      <BottomTab />
    </View>
  );
}