import { ActivityIndicator, View, Image } from "react-native";

import { styles } from "./styles";

import pesaAI from '@assets/pesaAIpng.png';

export function Loading() {
  return (
    <View style={styles.container}>
      <Image source={pesaAI} style={styles.image} />
      <ActivityIndicator color={'green'} />
    </View>
  )
}