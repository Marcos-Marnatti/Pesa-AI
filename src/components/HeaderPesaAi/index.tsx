import { Image, Text, View } from "react-native";

import { styles } from "./styles";

import logo from '@assets/pesaAIpng.png'

export function HeaderPesaAi() {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.textWrapper}>
        <Text style={styles.appFirstTitle}>PESA</Text>
        <Text style={styles.appSecondTitle}> AI</Text>
      </View>
    </View>
  );
}