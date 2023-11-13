import { Image, ImageBackground, Text, View } from "react-native";

import { styles } from "./styles";

import purpleBanner from "@assets/banner_purple.png"
import model3D from "@assets/model.png";
import fire from "@assets/fire.png";

export function WorkoutBanner() {
  return (
    <>
      <ImageBackground style={styles.banner} source={purpleBanner}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerRowContent}>
            <View style={styles.fireImageContainer}>
              <Image source={fire} resizeMode="contain" style={styles.fireImage} />
            </View>
            <Text style={styles.fireText}>
              Faça agora mesmo
            </Text>
          </View>
          <Text style={styles.fireText2}>Montar Treino</Text>
        </View>
      </ImageBackground >
      <Image source={model3D} style={styles.model3D} resizeMode="contain" />
    </>
  );
}