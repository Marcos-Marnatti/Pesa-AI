import { Image, ImageBackground, Text, View, TouchableOpacity } from "react-native";

import { styles } from "./styles";

import greenBanner from "@assets/banner_green.jpg"
import healthDiet3D from "@assets/healthDiet.png";
import fire from "@assets/fire.png";

export function DietBanner({ navigation }: { navigation?: any}) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={.9}
        onPress={() => navigation.navigate('GerarDieta')}
      >
        <ImageBackground style={styles.banner} source={greenBanner}>
          <View style={styles.bannerContent}>
            <View style={styles.bannerRowContent}>
              <View style={styles.fireImageContainer}>
                <Image source={fire} resizeMode="contain" style={styles.fireImage} />
              </View>
              <Text style={styles.fireText}>
                Faça agora mesmo
              </Text>
            </View>
            <Text style={styles.fireText2}>Montar Dieta</Text>
          </View>
        </ImageBackground >
        <Image source={healthDiet3D} style={styles.model3D} resizeMode="contain" />
      </TouchableOpacity>
    </>
  );
}