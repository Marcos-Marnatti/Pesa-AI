import { useState } from "react";
import { View, ImageBackground, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';

import union from '@assets/union.png'
import genderIcon from "@assets/gender.png";
import PhysicalConditioningIcon from "@assets/PhysicalConditioning.png";
import goalIcon from "@assets/goal.png";
import heightIcon from "@assets/height.png";
import weightIcon from "@assets/weight.png";
import birthIcon from "@assets/birthDate.png";

import { HeaderPesaAi } from "@components/HeaderPesaAi";
import { BottomPesaAi } from "@components/BottomPesaAi";
import DropdownSignupComponent from "@components/DropDownSignUp";
import Input from "@components/Input";

import { StackTypes } from "src/@types/StackNavigator";
import { handleSignUpAPI } from "@services/reqFirebase";

import { styles } from './styles';

export function SignupAnamnese({ route }: any) {
  const navigation = useNavigation<StackTypes>();

  const name = route.params.response.name;
  const email = route.params.response.email;
  const password = route.params.response.password;

  const [sex, setSext] = useState<string>('');
  const [size, setSize] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [weightGoal, setWeightGoal] = useState<string>('');
  const [physicalActivity, setPhysicalActivity] = useState<string>('');

  async function onSignUpHandle() {
    if (email.length === 0 || password.length === 0) {
      return Alert.alert("Campo vazio", "Preencha todos os campos.");
    }

    const response = await handleSignUpAPI({ name, email, sex, password, age, size, weight, physicalActivity, weightGoal });

    return response;
  }

  const genderData = [
    { label: 'Masculino', value: 'MALE' },
    { label: 'Feminino', value: 'FEMALE' },
  ];

  const goalData = [
    { label: 'Ganho de massa muscular', value: 'GAIN' },
    { label: 'Perda de gordura', value: 'LOSE' },
    { label: 'Manutenção', value: 'MAINTAIN' },
  ];
  const PhysicalConditioningData = [
    { label: 'Sedentário', value: 'NO' },
    { label: 'Intermediário', value: 'REGULAR' },
    { label: 'Ativo', value: 'FREQUENT' },
  ];



  return (
    <View style={styles.container}>
      <HeaderPesaAi />
      <ImageBackground source={union} style={styles.body}>
        <BlurView intensity={30} style={styles.contentContainer} >
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <DropdownSignupComponent selectLabel="Gênero" selectPlaceHolder="Selecione o gênero" isSearchable={false} color={'#EDEDED'} onSelectedValue={setSext} data={genderData} icon={genderIcon} />
              <Input selectLabel="Altura" selectPlaceHolder="Insira a altura (em cm)" onSelectedValue={setSize} data={size} icon={heightIcon} color={'#EDEDED'} placeHolderColor={'black'} />
              <Input selectLabel="Peso" selectPlaceHolder="Insira o peso (em kg)" onSelectedValue={setWeight} data={weight} icon={weightIcon} color={'#EDEDED'} placeHolderColor={'black'} />
              <Input selectLabel="Idade" selectPlaceHolder="Insira sua idade" onSelectedValue={setAge} data={age} icon={birthIcon} color={'#EDEDED'} placeHolderColor={'black'} />
              <DropdownSignupComponent selectLabel="Condicionamento Físico" selectPlaceHolder="Selecione o condicionamento" isSearchable={false} color={'#EDEDED'} onSelectedValue={setPhysicalActivity} data={PhysicalConditioningData} icon={PhysicalConditioningIcon} />
              <DropdownSignupComponent selectLabel="Objetivo" selectPlaceHolder="Selecione o objetivo" isSearchable={false} color={'#EDEDED'} onSelectedValue={setWeightGoal} data={goalData} icon={goalIcon} />
            </ScrollView>
            <TouchableOpacity style={styles.button}
              onPress={
                async () => {
                  const response = await onSignUpHandle();
                  if (response != 'sucesso' && response != undefined) {
                    return (
                      Alert.alert(`${response}`)
                    )
                  }
                  if (response == 'sucesso') {
                    navigation.navigate('SignIn');
                  }
                }}
            >
              <Text style={styles.buttonText}>Finalizar cadastro</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
        <View>
          <BottomPesaAi />
        </View>
      </ImageBackground>
    </View >
  );
}