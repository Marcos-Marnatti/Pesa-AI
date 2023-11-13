import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from "@routes/stack.route";
import { BottomTab } from "@components/BottomTab";

import PhysicalConditioningIcon from "@assets/PhysicalConditioning.png";
import frequencyIcon from "@assets/frequency.png";
import goalIcon from "@assets/goal.png";
import heightIcon from "@assets/height.png";
import weightIcon from "@assets/weight.png";
import birthIcon from "@assets/birthDate.png";

import { styles } from './styles';
import { Header } from "@components/Header";
import { auth } from "@config/firebase";
import { AuthenticatedUserContext } from "@context/AuthenticationContext";
import { useContext } from "react";

import edit from "@assets/edit.png";
import exit from "@assets/exit.png";


export function Profile() {
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
        <Header />
      </View >

      <View style={styles.middleScreen}>
        <View style={styles.statsContainer}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={heightIcon} style={styles.myIcon} />
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>178</Text>
              <Text style={[styles.text, styles.subText]}>Altura(cm)</Text>
            </View>
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image source={weightIcon} style={styles.myIcon} />
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>89,6</Text>
                <Text style={[styles.text, styles.subText]}>Peso(kg)</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={birthIcon} style={styles.myIcon} />
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>25</Text>
              <Text style={[styles.text, styles.subText]}>Idade</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <View style={{ width: '65%', flexDirection: 'row' }}>
              <Image source={goalIcon} style={styles.myIcon} />
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>Perda de gordura</Text>
                <Text style={[styles.text, styles.subText]}>Objetivo</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderRightWidth: 1 }]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image source={PhysicalConditioningIcon} style={styles.myIcon} />
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>Ativo</Text>
                <Text style={[styles.text, styles.subText]}>Condicionamento</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={frequencyIcon} style={styles.myIcon} />
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>5x</Text>
              <Text style={[styles.text, styles.subText]}>Frequência</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 25, width: '90%', borderBottomWidth: 1, borderBottomColor: '#DFD8C8', }} />

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <View style={{ width: '55%', flexDirection: 'row' }}>
              <View style={styles.statsBox}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={edit} style={[styles.myIcon, { width: 32, height: 32 }]} />
                  <Text style={[styles.text, { fontSize: 26, marginStart: 15, }]}>Editar Perfil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <View style={{ width: '55%', flexDirection: 'row' }}>
              <View style={styles.statsBox}>
                <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={exit} style={[styles.myIcon, { width: 32, height: 32 }]} />
                  <Text style={[styles.text, { fontSize: 26, marginStart: 15, color: 'red' }]}>Sair</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      </View>
      <BottomTab />
    </View >
  );
}