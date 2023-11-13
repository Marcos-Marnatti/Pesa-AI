import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

export function BottomPesaAi() {
  return (
    <View style={styles.bottomTextWrapper}>
      <Text style={styles.textService}>Ao usar o Pesa AI, você está concordando com nossos</Text>
      <TouchableOpacity
      // onPress={() => {}}
      >
        <Text style={styles.textServiceTerms}>Termos de Serviço</Text>
      </TouchableOpacity>
    </View>
  );
}