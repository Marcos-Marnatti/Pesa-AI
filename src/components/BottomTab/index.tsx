import { Image, ImageSourcePropType, ImageStyle, StyleProp, View, TouchableOpacity } from "react-native";

import { styles } from "./styles";

import home from '@assets/Home.png';
import heart from '@assets/Heart.png';
import pesaAI from '@assets/pesaAIpng.png';
import meals from '@assets/meals.png';
import profile from '@assets/User.png';
import invisible from '@assets/favicon.png';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "@routes/stack.route";

type Props = {
  image: ImageSourcePropType,
  style?: StyleProp<ImageStyle>,
  imageStyle?: StyleProp<ImageStyle>,
  navigateTo: never;
}

const BottomButton = ({ image, style, imageStyle, navigateTo }: Props) => {
  const navigation = useNavigation<StackTypes>();

  return (
    <>
      <View style={[
        {
          flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
        },
        style
      ]}>
        <TouchableOpacity
          activeOpacity={.5}
          onPress={() => navigation.navigate(navigateTo)}>
          <Image
            source={image}
            style={[{
              height: image === pesaAI ? 40 : image === invisible ? 0 : 25,
              width: image === pesaAI ? 40 : image === invisible ? 0 : 25,
            },
              imageStyle
            ]} />
        </TouchableOpacity>
      </View>
    </>
  );
}


export function BottomTab() {
  return (
    <View style={styles.bottomTabContainer}>
      <BottomButton image={home} navigateTo={"Home" as never} />
      <BottomButton image={meals} navigateTo={"Meals" as never }/>
      <BottomButton image={pesaAI} style={styles.aiButton} navigateTo={"Chat" as never} />
      <BottomButton image={invisible} navigateTo={"" as never} />
      <BottomButton image={heart} navigateTo={"Anamnese" as never }/>
      <BottomButton image={profile} navigateTo={"Profile" as never}/>
    </View>
  );
}