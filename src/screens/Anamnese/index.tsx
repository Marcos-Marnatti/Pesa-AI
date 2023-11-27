import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
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
import { AuthenticatedUserContext } from "@context/AuthenticationContext";
import { handleUpdateUser } from "@services/reqFirebase";

export function Anamnese() {
  const navigation = useNavigation<StackTypes>();

  const { userData, valueChanged } = useContext(AuthenticatedUserContext);


  const [sex, setSext] = useState<string>(userData?.sex!);
  const [size, setSize] = useState<number>(userData?.size!);
  const [weight, setWeight] = useState<number>(userData?.weight!);
  const [age, setAge] = useState<number>(userData?.age!);
  const [weightGoal, setWeightGoal] = useState<string>(userData?.weightGoal!);
  const [physicalActivity, setPhysicalActivity] = useState<string>(userData?.physicalActivity!);

  async function onUpdateAnamneseHandle() {
    if (sex.length === 0 || size === 0 || weight === 0 || age === 0 || weightGoal.length === 0 || physicalActivity.length === 0) {
      return Alert.alert("Campo vazio", "Preencha todos os campos.");
    }
    if (size < 70 || size > 240) {
      return Alert.alert("Altura inválida", "Preencha o campo corretamente.");
    }
    if (weight < 35 || weight > 250) {
      return Alert.alert("Peso inválido", "Preencha o campo corretamente.");
    }
    if (age < 10 || age > 100) {
      return Alert.alert("Idade inválida", "Preencha o campo corretamente.");
    }

    const response = await handleUpdateUser({ name: userData?.name!, email: userData?.email!, sex, age, size, weight, physicalActivity, weightGoal });

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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image source={anamnese} style={styles.healthImage} />
      <ScrollView style={{ height: '42%' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <DropdownComponent selectLabel="Gênero" selectPlaceHolder="Selecione o gênero" isSearchable={false} color={'#FF7C29'} onSelectedValue={setSext} data={genderData} icon={genderIcon} defaultValue={sex} />
          <Input selectLabel="Altura" selectPlaceHolder="Insira a altura (em cm)" onSelectedValue={setSize} data={size} icon={heightIcon} color={'#FF7C29'} placeHolderColor={'black'} />
          <Input selectLabel="Peso" selectPlaceHolder="Insira o peso (em kg)" onSelectedValue={setWeight} data={weight} icon={weightIcon} color={'#FF7C29'} placeHolderColor={'black'} />
          <Input selectLabel="Idade" selectPlaceHolder="Insira sua idade" onSelectedValue={setAge} data={age} icon={birthIcon} color={'#FF7C29'} placeHolderColor={'black'} />
          <DropdownComponent selectLabel="Condicionamento Físico" selectPlaceHolder="Selecione o condicionamento" isSearchable={false} color={'#FF7C29'} onSelectedValue={setPhysicalActivity} data={PhysicalConditioningData} icon={PhysicalConditioningIcon} defaultValue={physicalActivity} />
          <DropdownComponent selectLabel="Objetivo" selectPlaceHolder="Selecione o objetivo" isSearchable={false} color={'#FF7C29'} onSelectedValue={setWeightGoal} data={goalData} icon={goalIcon} defaultValue={weightGoal} />
        </View >
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={
          async () => {
            const response = await onUpdateAnamneseHandle();
            if (response != 'sucesso' && response != undefined) {
              return (
                Alert.alert(`${response}`)
              )
            }
            if (response == 'sucesso') {
              navigation.navigate('Home');
            }
          }}
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