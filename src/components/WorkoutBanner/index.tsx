import { Image, ImageBackground, Text, View } from "react-native";

import { styles } from "./styles";

import purpleBanner from "@assets/banner_purple.png"
import model3D from "@assets/model.png";
import dietH from "@assets/dietH.png";

export function WorkoutBanner() {
  return (
    <>
      <ImageBackground style={styles.banner} source={purpleBanner}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerRowContent}>
            <View style={styles.fireImageContainer}>
              <Image source={dietH} resizeMode="contain" style={styles.fireImage} />
            </View>
            <Text style={styles.fireText}>
              Consulte suas dietas
            </Text>
          </View>
          <Text style={styles.fireText2}>Histórico</Text>
        </View>
      </ImageBackground >
      <Image source={model3D} style={styles.model3D} resizeMode="contain" />
    </>
  );
}