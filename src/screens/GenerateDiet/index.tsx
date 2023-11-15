import { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import Slider from '@react-native-community/slider';

import { styles } from './styles';
import { api } from "../../lib/axios";

import DropdownComponent from "@components/DropDown";

import healthDiet3D from "@assets/healthDiet.png";
import caloriesIcon from "@assets/calories.png";
import mealIcon from "@assets/meal.png";
import goalIcon from "@assets/goal.png";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "@routes/stack.route";
import { UserService } from "src/@types/User";
import { handleGetUserData } from "@services/reqFirebase";
import { AuthenticatedUserContext } from "@context/AuthenticationContext";

export function GenerateDiet() {
  const navigation = useNavigation<StackTypes>();
  const [calories, setCalories] = useState<string>('');
  // const [diet, setDiet] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [meals, setMeal] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0.3);
  
  const { setUser, user }: any = useContext(AuthenticatedUserContext);
  const [userData, setUserData] = useState<UserService>();


  useEffect(() => {
    async function handle() {
      if (user) {
        await handleGetUserData(user.email)
          .then((response) => {
            setUserData(response);
          })
      }
    }
    handle();
  }, []);


  async function handleAICompletion() {
    try {
      temperature.toPrecision(1);
      const data = {
        calories,
        goal,
        meals,
        temperature
      }

      if (calories.length === 0 || goal.length === 0 || meals.length === 0) {
        return Alert.alert('Campo vazio', 'Por favor, selecione todos os campos para continuar.')
      }

      await api.post('/ai/complete', data)
        //@ts-ignore
        .then((response) => navigation.navigate('GerarDietaResposta', { response: response.data }))
      // setDiet(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  const caloriesData = [
    { label:`${Math.trunc(userData?.basalMetabolicRate.toPrecision())} Kcal`, value: `${Math.trunc(userData?.basalMetabolicRate.toPrecision())}` },
  ];

  const goalData = [
    {
      label: `${userData?.weightGoal === 'LOSE' ? 'Perda de gordura' : userData?.weightGoal === 'GAIN' ? 'Ganho de massa muscular' : 'Manutenção'}`,
      value: `${userData?.weightGoal === 'LOSE' ? 'Perda de gordura' : userData?.weightGoal === 'GAIN' ? 'Ganho de massa muscular' : 'Manutenção'}`,
    },
  ];

  const mealsData = [
    { label: '3 Refeições', value: '3' },
    { label: '4 Refeições', value: '4' },
    { label: '5 Refeições', value: '5' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image source={healthDiet3D} style={styles.healthImage} />
        <DropdownComponent selectLabel="Gasto Calórico" selectPlaceHolder="Selecione a quantidade de calorias" isSearchable={false} onSelectedValue={setCalories} data={caloriesData} icon={caloriesIcon} />
        <DropdownComponent selectLabel="Objetivo" selectPlaceHolder="Selecione o objetivo" isSearchable={false} onSelectedValue={setGoal} data={goalData} icon={goalIcon} />
        <DropdownComponent selectLabel="Refeições" selectPlaceHolder="Selecione a quantidade de refeições" isSearchable={false} onSelectedValue={setMeal} data={mealsData} icon={mealIcon} />
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