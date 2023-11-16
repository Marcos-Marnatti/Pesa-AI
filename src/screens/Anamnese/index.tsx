import { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import DropdownComponent from "@components/DropDown";
import { BottomTab } from "@components/BottomTab";
import Input from "@components/Input";

import genderIcon from "@assets/gender.png";
import PhysicalConditioningIcon from "@assets/PhysicalConditioning.png";
import goalIcon from "@assets/goal.png";
import heightIcon from "@assets/height.png";
import weightIcon from "@assets/weight.png";
import birthIcon from "@assets/birthDate.png";
import anamnese from "@assets/anamnese.jpg";

import { StackTypes } from "src/@types/StackNavigator";

import { styles } from './styles';

export function Anamnese() {
  const navigation = useNavigation<StackTypes>();
  const [sex, setSext] = useState<string>('');
  const [size, setSize] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [weightGoal, setWeightGoal] = useState<string>('');
  const [physicalActivity, setPhysicalActivity] = useState<string>('');

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

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image source={anamnese} style={styles.healthImage} />
      <ScrollView style={{ height: '42%' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <DropdownComponent selectLabel="Gênero" selectPlaceHolder="Selecione o gênero" isSearchable={false} color={'#FF7C29'} onSelectedValue={setSext} data={genderData} icon={genderIcon} />
          <Input selectLabel="Altura" selectPlaceHolder="Insira a altura (em cm)" onSelectedValue={setSize} data={size} icon={heightIcon} color={'#FF7C29'} placeHolderColor={'black'} />
          <Input selectLabel="Peso" selectPlaceHolder="Insira o peso (em kg)" onSelectedValue={setWeight} data={weight} icon={weightIcon} color={'#FF7C29'} placeHolderColor={'black'} />
          <Input selectLabel="Idade" selectPlaceHolder="Insira sua idade" onSelectedValue={setAge} data={age} icon={birthIcon} color={'#FF7C29'} placeHolderColor={'black'} />
          <DropdownComponent selectLabel="Condicionamento Físico" selectPlaceHolder="Selecione o condicionamento" isSearchable={false} color={'#FF7C29'} onSelectedValue={setPhysicalActivity} data={PhysicalConditioningData} icon={PhysicalConditioningIcon} />
          <DropdownComponent selectLabel="Objetivo" selectPlaceHolder="Selecione o objetivo" isSearchable={false} color={'#FF7C29'} onSelectedValue={setWeightGoal} data={goalData} icon={goalIcon} />
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