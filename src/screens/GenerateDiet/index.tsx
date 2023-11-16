import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import Slider from '@react-native-community/slider';
import DropdownComponent from "@components/DropDown";

import healthDiet3D from "@assets/healthDiet.png";
import caloriesIcon from "@assets/calories.png";
import mealIcon from "@assets/meal.png";
import goalIcon from "@assets/goal.png";
import { useNavigation } from "@react-navigation/native";

import { StackTypes } from "src/@types/StackNavigator";
import { completionAI, handleData } from "./utils";

import { styles } from './styles';

export function GenerateDiet() {
  const navigation = useNavigation<StackTypes>();

  const [calories, setCalories] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [meals, setMeal] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0.3);

  async function handleAICompletion() {
    completionAI(calories, goal, meals, temperature, navigation);
  }
  
  const data = handleData();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image source={healthDiet3D} style={styles.healthImage} />
        <DropdownComponent selectLabel="Gasto Calórico" selectPlaceHolder="Selecione a quantidade de calorias" isSearchable={false} onSelectedValue={setCalories} data={data.caloriesData} icon={caloriesIcon} />
        <DropdownComponent selectLabel="Objetivo" selectPlaceHolder="Selecione o objetivo" isSearchable={false} onSelectedValue={setGoal} data={data.goalData} icon={goalIcon} />
        <DropdownComponent selectLabel="Refeições" selectPlaceHolder="Selecione a quantidade de refeições" isSearchable={false} onSelectedValue={setMeal} data={data.mealsData} icon={mealIcon} />
        <Text style={styles.sliderText}>Criatividade:</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={0.6}
            step={0.1}
            minimumTrackTintColor="#2EE6A8"
            value={temperature}
            onValueChange={setTemperature}
            maximumTrackTintColor="lightgrey"
          />
          <TouchableOpacity style={styles.sliderValueBackground}>
            <Text style={styles.sliderValue}>{temperature.toPrecision(1)}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleAICompletion}
        >
          <Text style={styles.textButton}>
            Montar Dieta
          </Text>
        </TouchableOpacity >
      </View >
    </View>
  );
}