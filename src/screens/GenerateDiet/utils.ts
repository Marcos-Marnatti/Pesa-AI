import { useContext } from 'react';
import { api } from "@lib/axios";
import { Alert } from "react-native";
import { AuthenticatedUserContext } from '@context/AuthenticationContext';

export async function completionAI(calories: string, goal: string, meals: string, temperature: number, navigation: any) {
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
      
  } catch (error) {
    console.log(error);
  }
};

export function handleData() {
  const { userData } = useContext(AuthenticatedUserContext);

  const caloriesData = [
    { label: `${Math.trunc(userData?.basalMetabolicRate.toPrecision())} Kcal`, value: `${Math.trunc(userData?.basalMetabolicRate.toPrecision())}` },
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

  return { caloriesData, goalData, mealsData };
}