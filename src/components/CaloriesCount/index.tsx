import { Image, Text, View } from "react-native";
import * as Progress from 'react-native-progress';

import caloriesIcon from "@assets/calories.png";

import { styles } from "./styles";

type Props = {
  basalMetabolicRate: number,
  consumedProtCalories: number,
  consumedCarbCalories: number,
  consumedFatCalories: number,
  consumedCalories: number,
};

export function CaloriesCount({ basalMetabolicRate, consumedProtCalories, consumedCarbCalories, consumedFatCalories, consumedCalories }: Props) {
  Number.isNaN(basalMetabolicRate) ? basalMetabolicRate = Math.trunc(3000) : basalMetabolicRate = basalMetabolicRate;

  return (
    <>
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <View style={{ width: '55%', flexDirection: 'row' }}>
            <Image source={caloriesIcon} style={[styles.myIcon, { width: 50, height: 50 }]} />
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 28 }]}>{basalMetabolicRate} KCAL</Text>
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
          <Progress.Bar progress={consumedProtCalories / basalMetabolicRate} width={150} color={'#24B3B3'} />
          <Progress.Bar progress={consumedCarbCalories / basalMetabolicRate} width={150} style={{ top: 5 }} color={'#2EE6A8'} />
          <Progress.Bar progress={consumedFatCalories / basalMetabolicRate} width={150} style={{ top: 10 }} color={'#FFCD69'} />
          <Progress.Bar progress={consumedCalories / basalMetabolicRate} width={150} style={{ top: 15 }} color={'#FF7B79'} />
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-end', marginLeft: 30 }}>
          <Text style={styles.macrosText}>{consumedProtCalories.toFixed(0)} / {((basalMetabolicRate / 100) * 25).toFixed(0)} Kcal</Text>
          <Text style={styles.macrosText}>{consumedCarbCalories.toFixed(0)}  / {((basalMetabolicRate / 100) * 50).toFixed(0)} Kcal</Text>
          <Text style={styles.macrosText}>{consumedFatCalories.toFixed(0)}  / {((basalMetabolicRate / 100) * 25).toFixed(0)} Kcal</Text>
          <Text style={[styles.macrosText, { fontFamily: 'Exo_800ExtraBold' }]}>{consumedCalories.toFixed(0)} / {basalMetabolicRate} Kcal</Text>
        </View>
      </View>
    </>
  )
}