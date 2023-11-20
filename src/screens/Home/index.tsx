import { useContext, useState } from "react";
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

export function Home() {
  const navigation = useNavigation<StackTypes>();
  const { currentUser, logout } = useContext(AuthenticatedUserContext);

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
          <CaloriesCount />
        </View>
      </View>
      <BottomTab />
    </View>
  );
}