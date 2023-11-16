import { View, Image, Text, ImageSourcePropType, ScrollView } from "react-native";

import menu from "@assets/menu.png";
import pesaAI from '@assets/pesaAIpng.png';
import verified from '@assets/verified.png';

import { BottomTab } from "@components/BottomTab";

import { styles } from './styles';

const ImageContainer = ({ image }: { image: ImageSourcePropType; }) => {
  return (
    <View style={styles.avatarContainer}>
      <Image source={image} style={styles.avatar} />
    </View>
  )
};

const HeaderTitle = () => {
  return (
    <View style={styles.title}>
      <Text style={styles.greetingText}>Assitente Virtual Pesa AI
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={verified} style={{ width: 16, height: 16, top: 1.5, marginRight: 2 }} />
        <Text style={styles.dateText}>Online</Text>
      </View>
    </View>
  )
};


export function GenerateDietResponse({ route }: any) {
  const response = route.params.response;
  const responseSplit = response.split('Refeição');

  console.log('-------------\n' + responseSplit[1].split('-')[2] + '\n-------------');
  return (
    <View style={{ flex: 1, }}>
      <View style={styles.screenContainer}>
        <View style={styles.header}>
          <ImageContainer image={pesaAI} />
          <HeaderTitle />
        </View >
        <View style={styles.middleScreen}>
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <View style={{ width: '55%', flexDirection: 'row' }}>
                <Image source={menu} style={styles.myIcon} />
                <View style={styles.statsBox}>
                  <Text style={[styles.text, { fontSize: 28 }]}>Cardápio</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: '2%', width: '90%', borderBottomWidth: 1, borderBottomColor: '#DFD8C8', alignSelf: 'center' }} />
          <View style={{ width: '90%', height: '90%', justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={{marginTop: 20, backgroundColor: 'transparent', flex: 1,}}>
                <Text style={[styles.text, {  fontSize: 16 }]}>{route.params.response}</Text>
              </View>
            </ScrollView>
            <View style={{ height: '2%', width: '90%', borderBottomWidth: 1, borderBottomColor: '#DFD8C8', alignSelf: 'center' }} />
            <Text style={styles.text}>Este cardápio serve somente como uma sugestão.</Text>
            <Text style={[styles.text, { fontFamily: 'Exo_800ExtraBold', fontSize: 16 }]}>Procure um nutricionista.</Text>
          </View>
        </View>
      </View>
      <BottomTab />
    </View>
  );
}