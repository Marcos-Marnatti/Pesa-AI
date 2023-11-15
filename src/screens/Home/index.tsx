import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { DietHistoric } from "@components/DietHistoric";
import { Header } from "@components/Header";
import { DietBanner } from "@components/DietBanner";
import { BottomTab } from "@components/BottomTab";
import { StackTypes } from "@routes/stack.route";

import { AuthenticatedUserContext } from "../../context/AuthenticationContext";
import { auth } from "../../config/firebase";
import { CaloriesCount } from "@components/CaloriesCount";
import { UserService } from "src/@types/User";
import { handleGetUserData } from "@services/reqFirebase";


export function Home() {
  const navigation = useNavigation<StackTypes>();
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
        <Header onPress={logout} userName={user.displayName} />
      </View >

      <View style={styles.middleScreen}>
        <View style={styles.screen}>
          <DietBanner navigation={navigation} />
        </View>
        <View style={styles.dietScreen}>
          <DietHistoric />
        </View>
        <View style={{ height: 25, width: '90%', borderBottomWidth: 1, borderBottomColor: '#DFD8C8', alignSelf: 'center' }} />
        <View style={styles.caloriesContainer}>
          <CaloriesCount calories={userData?.basalMetabolicRate!} />
        </View>
      </View>
      <BottomTab />
    </View>
  );
}