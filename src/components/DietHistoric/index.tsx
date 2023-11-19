import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

import dietH from "@assets/dietH.png";
import banner from "@assets/sepia_banner.jpg";
import ampIcon from "@assets/amp.png";

export function DietHistoric({ navigation }: { navigation?: any }) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={.9}
        onPress={() => navigation.navigate('HistoricoDietas')}
      >
        <ImageBackground style={styles.banner} source={banner} >
          <View style={styles.bannerContent}>
            <View style={styles.bannerRowContent}>
              <View style={styles.fireImageContainer}>
                <Image source={ampIcon} resizeMode="contain" style={styles.fireImage} />
              </View>
              <Text style={styles.fireText}>
                Consulte suas dietas
              </Text>
            </View>
            <Text style={styles.fireText2}>Histórico</Text>
          </View>
        </ImageBackground >
        <Image source={dietH} style={styles.model3D} resizeMode="contain" />
      </TouchableOpacity>
    </>
  );
}