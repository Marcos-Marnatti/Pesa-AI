import { useContext } from "react";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { WorkoutBanner } from "@components/WorkoutBanner";
import { Header } from "@components/Header";
import { DietBanner } from "@components/DietBanner";
import { BottomTab } from "@components/BottomTab";
import { StackTypes } from "@routes/stack.route";

import { AuthenticatedUserContext } from "../../context/AuthenticationContext";
import { auth } from "../../config/firebase";
import { CaloriesCount } from "@components/CaloriesCount";


export function Home() {
  const navigation = useNavigation<StackTypes>();
  const { setUser }: any = useContext(AuthenticatedUserContext);

  async function logout() {
    try {
      auth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Header onPress={logout} />
      </View >

      <View style={styles.middleScreen}>
        <View style={styles.screen}>
          <DietBanner navigation={navigation} />
        </View>
        <View style={styles.dietScreen}>
          <WorkoutBanner />
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