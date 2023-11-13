import { Image, Text, View, ImageSourcePropType } from "react-native";
import * as Progress from 'react-native-progress';

import calories from "@assets/calories.png";

import { styles } from "./styles";

export function CaloriesCount({ onPress }: { onPress?: () => void }) {
  return (
    <>
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <View style={{ width: '55%', flexDirection: 'row' }}>
            <Image source={calories} style={[styles.myIcon, { width: 50, height: 50 }]} />
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 28 }]}>3000 KCAL</Text>
              <Text style={[styles.text, styles.subText, { fontSize: 18 }]}>Meta diária</Text>
            </View>
          </View>
        </View>
      </View>


      <View style={{ width: '90%', height: '50%', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
          <Text style={styles.macrosText}>Proteína</Text>
          <Text style={styles.macrosText}>Carboidrato</Text>
          <Text style={styles.macrosText}>Gordura</Text>
          <Text style={[styles.macrosText, { fontFamily: 'Exo_800ExtraBold' }]}>Total</Text>
        </View>
        <View style={{ marginStart: 20, flexDirection: 'column', justifyContent: 'space-evenly' }}>
          <Progress.Bar progress={0.5} width={150} color={'#24B3B3'} />
          <Progress.Bar progress={0.8} width={150} style={{ top: 5 }} color={'#2EE6A8'} />
          <Progress.Bar progress={0.5} width={150} style={{ top: 10 }} color={'#FFCD69'} />
          <Progress.Bar progress={0.8} width={150} style={{ top: 15 }} color={'#FF7B79'} />
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-end', marginLeft: 30 }}>
          <Text style={styles.macrosText}>{(3000 / 100) * 20} / {(3000 / 100) * 25} Kcal</Text>
          <Text style={styles.macrosText}>{(3000 / 100) * 40} / {(3000 / 100) * 50} Kcal</Text>
          <Text style={styles.macrosText}>{(3000 / 100) * 20} / {(3000 / 100) * 25} Kcal</Text>
          <Text style={[styles.macrosText, { fontFamily: 'Exo_800ExtraBold' }]}>{2400} / {3000} Kcal</Text>
        </View>
      </View>
    </>
  )

}