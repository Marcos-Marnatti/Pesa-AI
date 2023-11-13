import { View, Text, Image } from "react-native";
import * as Progress from 'react-native-progress';

import { styles } from './styles';

import calories from "@assets/calories.png";

export function PieChart() {
  return (
    <View style={styles.pieContainer}>
      <Image source={calories} style={styles.caloriesImage} />
      <Progress.Circle
        size={200}
        indeterminate={false}
        progress={85 / 100}
        showsText
        unfilledColor="#ededed"
        borderColor="#ededed"
        thickness={10}
        strokeCap="round"
        borderWidth={3}
        direction="counter-clockwise"
        fill="white"
        textStyle={{
          fontSize: 16,
          fontWeight: 'bold',
        }}
        formatText={(progress) => {
          const total = 3000;
          const consumed = total * progress;
          return `${consumed} de ${total}\n     Kcal`
        }}
        style={{
          right: 25,
          top: 15,
        }}
      />
      <View style={{
        height: '25%',
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View style={{
          right: 10,
        }}>
          <Text style={styles.macrosText}>Proteína</Text>
          <Progress.Bar progress={0.5} width={150} />
          <Text style={styles.macrosText}>Carboidrato</Text>
          <Progress.Bar progress={0.3} width={150} />
          <Text style={styles.macrosText}>Gordura</Text>
          <Progress.Bar progress={0.3} width={150} />
        </View>
      </View>
    </View>
  );
}

/*
from "react-native-svg@13.9.0" ---> to "react-native-svg@13.4.0"
npm install react-native-svg@13.4.0 react-native-progress
*/