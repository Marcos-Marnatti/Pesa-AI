import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import menu from "@assets/menu.png";
import dietIcon from "@assets/diet.png";

import DropdownComponent from '@components/DropDown';
import { BottomTab } from "@components/BottomTab";

import { StackTypes } from 'src/@types/StackNavigator';
import { Diet } from 'src/@types/Diet';

import { styles } from './styles';
import { AuthenticatedUserContext } from '@context/AuthenticationContext';
import { handleGetUserDiet } from '@services/reqFirestore';
import { ScrollView } from 'react-native';

type Props = {
  label: string;
  value: string;
}[];

export function HistoricDiet() {
  const navigation = useNavigation<StackTypes>();
  const [diet, setDiet] = useState('');
  const dietData: Props = [];

  const { currentUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    async function handleGetDiets() {
      const response: Diet[] = await handleGetUserDiet(currentUser?.uid!);

      response.map((diet: Diet, index) => {
        dietData.push({ label: `Dieta ${index + 1}`, value: diet.diet });
      })

      console.log(dietData.length);
    };
    handleGetDiets();
  }, [diet]);

  return (
    <View style={styles.screenContainer}>
      <View style={{ height: '15%' }}>
        <DropdownComponent selectLabel="Dieta" selectPlaceHolder="Selecione a dieta" isSearchable={false} color={'#2EE6A8'} onSelectedValue={setDiet} data={dietData} icon={dietIcon} />
      </View>
      <View style={styles.middleScreen}>
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <View style={{ width: '55%', flexDirection: 'row', marginTop: 10 }}>
              <Image source={menu} style={styles.myIcon} />
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 28 }]}>Refeições</Text>
              </View>
            </View>
            <View style={{ height: '2%', width: '80%', borderBottomWidth: 1, borderBottomColor: '#DFD8C8', alignSelf: 'center', marginTop: 10 }} />
          </View>
        </View>
        <View style={{ marginHorizontal: '6%', height: '70%' }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20, backgroundColor: 'transparent', flex: 1, }}>
              <Text style={[styles.text, { fontSize: 16 }]}>{diet}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <BottomTab />
    </View >
  );
}