import { Image, Text, View, ImageSourcePropType } from "react-native";

import { styles } from "./styles";

import { Icons } from "@components/Icons";

import avatar from "@assets/avatar.png"
import logout from "@assets/logout.png"

const currentDay = new Date(Date.now()).toLocaleString('pt-br', { dateStyle: 'full' });

const ImageContainer = ({ image }: { image: ImageSourcePropType; }) => {
  return (
    <View style={styles.avatarContainer}>
      {image ? ( 
        //@ts-ignore
         <Image source={{ uri: image }} style={styles.avatar} />
      ) : (
        <Image source={avatar} style={styles.avatar} />
      )}
    </View>
  )
};

const HeaderTitle = ({ username }: { username: string; }) => {
  return (
    <View style={styles.title}>
      <Text style={styles.greetingText}>Olá, {username}</Text>
      <Text style={styles.dateText}>{currentDay}</Text>
    </View>
  )
};


export function Header({ onPress, userName, avatar }: { onPress?: () => void, userName: string, avatar: any }) {
  return (
    <>
      {
        onPress ?
          <View style={styles.header}>
            <ImageContainer image={avatar} />
            <HeaderTitle username={userName} />
            <View style={{ alignSelf: "center", marginEnd: 10 }}>
              <Icons width={36} height={36} tintColor={'grey'} icon={logout} onPress={onPress} />
            </View>
          </View>
          :
          <View style={styles.header}>
            <ImageContainer image={avatar} />
            <HeaderTitle username={userName} />
          </View>

      }
    </>
  )

}