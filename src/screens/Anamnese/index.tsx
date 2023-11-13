import { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

import DropdownComponent from "@components/DropDown";
import Input from "@components/Input";

import genderIcon from "@assets/gender.png";
import PhysicalConditioningIcon from "@assets/PhysicalConditioning.png";
import goalIcon from "@assets/goal.png";
import heightIcon from "@assets/height.png";
import weightIcon from "@assets/weight.png";
import birthIcon from "@assets/birthDate.png";
import frequencyIcon from "@assets/frequency.png";
import anamnese from "@assets/anamnese.jpg";


import { useNavigation } from '@react-navigation/native';

import { StackTypes } from "@routes/stack.route";

import { styles } from './styles';
import { BottomTab } from "@components/BottomTab";


export function Anamnese() {
  const navigation = useNavigation<StackTypes>();
  const [gender, setGender] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [imc, setIMC] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [physicalConditioning, setPhysicalConditioning] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');

  const genderData = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
  ];

  const goalData = [
    { label: 'Ganho de massa muscular', value: 'Ganho de massa muscular' },
    { label: 'Perda de gordura', value: 'Perda de gordura' },
    { label: 'Manutenção', value: 'Manutenção' },
  ];
  const PhysicalConditioningData = [
    { label: 'Sedentário', value: 'Sedentário' },
    { label: 'Intermediário', value: 'Intermediário' },
    { label: 'Ativo', value: 'Ativo' },
  ];

  const frequencyData = [
    { label: '3x', value: '3' },
    { label: '4x', value: '4' },
    { label: '5x', value: '5' },
    { label: '6x', value: '6' },
    { label: '7x', value: '7' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image source={anamnese} style={styles.healthImage} />
      <ScrollView style={{ height: '42%' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <DropdownComponent selectLabel="Gênero" selectPlaceHolder="Selecione o gênero" isSearchable={false} color={'#FF7C29'} onSelectedValue={setGender} data={genderData} icon={genderIcon} />
          <Input selectLabel="Altura" selectPlaceHolder="Insira a altura (em cm)" onSelectedValue={setHeight} data={height} icon={heightIcon} />
          <Input selectLabel="Peso" selectPlaceHolder="Insira o peso (em kg)" onSelectedValue={setWeight} data={weight} icon={weightIcon} />
          <Input selectLabel="Data de Nascimento" selectPlaceHolder="ex: 09/07/1998" onSelectedValue={setBirthDate} data={birthDate} icon={birthIcon} />
          <DropdownComponent selectLabel="Condicionamento Físico" selectPlaceHolder="Selecione o condicionamento" isSearchable={false}  color={'#FF7C29'} onSelectedValue={setPhysicalConditioning} data={PhysicalConditioningData} icon={PhysicalConditioningIcon} />
          <DropdownComponent selectLabel="Objetivo" selectPlaceHolder="Selecione o objetivo" isSearchable={false} color={'#FF7C29'} onSelectedValue={setGoal} data={goalData} icon={goalIcon} />
          <DropdownComponent selectLabel="Frequência de treino" selectPlaceHolder="Selecione a frequência" isSearchable={false} color={'#FF7C29'} onSelectedValue={setFrequency} data={frequencyData} icon={frequencyIcon} />
        </View >
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
      // onPress={handleAICompletion}
      >
        <Text style={styles.textButton}>
          Finalizar
        </Text>
      </TouchableOpacity >
      <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
        <BottomTab />
      </View>
    </View>
  );
}