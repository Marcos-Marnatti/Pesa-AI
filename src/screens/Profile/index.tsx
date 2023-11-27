import { useContext, useState } from "react";
import { View, Image, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { updateProfile, getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';

import { AuthenticatedUserContext } from "@context/AuthenticationContext";

import PhysicalConditioningIcon from "@assets/PhysicalConditioning.png";
import genderIcon from "@assets/gender.png";
import goalIcon from "@assets/goal.png";
import heightIcon from "@assets/height.png";
import weightIcon from "@assets/weight.png";
import birthIcon from "@assets/birthDate.png";
import edit from "@assets/edit.png";
import editAvatar from "@assets/editarAvatar.png";
import exit from "@assets/exit.png";

import { Header } from "@components/Header";
import { BottomTab } from "@components/BottomTab";

import { handleTranslateGender, handleTranslateGoal, handleTranslatePhysicalActivity } from "./utils";

import { styles } from './styles';
import { storage } from "@config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function Profile() {
  const [newName, setNewName] = useState('');
  const { currentUser, userData, logout, isValueChanged, valueChanged } = useContext(AuthenticatedUserContext);
  const user = getAuth().currentUser;
  const nameRegex = new RegExp('^[a-zA-Z ]+$');

  const updateUserPhoto = async (image: string) => {
    try {
      const timestamp = Date.now();
      const imageName = `avatar_${currentUser?.uid}_${timestamp}.jpg`;

      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, imageName);
      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);

      if (user) {
        await updateProfile(user, {
          photoURL: image,
        });
      }
      isValueChanged(!valueChanged);
      return url;
    } catch (error) {
      console.error('Error updating user photo: ', error);
      throw error;
    }
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        await updateUserPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

  async function updateDisplayName(newDisplayName: string) {
    try {
      if (user) {
        if (!nameRegex.test(newDisplayName)) {
          Alert.alert("Nome inválido", "Preencha o campo corretamente.");
          return false;
        }
        await updateProfile(user, {
          displayName: newDisplayName
        });

        isValueChanged(!valueChanged);
        setNewName('');
        return Alert.alert('Sucesso', 'Seu nome foi atualizado com sucesso!');
      } else {
        console.error('Nenhum usuário está autenticado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o displayName:', error);
    }
  }


  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Header userName={currentUser?.displayName!} avatar={currentUser?.photoURL} />
      </View >

      <View style={styles.middleScreen}>
        <View style={styles.statsContainer}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={heightIcon} style={styles.myIcon} />
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>{userData?.size}</Text>
              <Text style={[styles.text, styles.subText]}>Altura(cm)</Text>
            </View>
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image source={weightIcon} style={styles.myIcon} />
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>{userData?.weight}</Text>
                <Text style={[styles.text, styles.subText]}>Peso(kg)</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={birthIcon} style={styles.myIcon} />
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>{userData?.age}</Text>
              <Text style={[styles.text, styles.subText]}>Idade</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <View style={{ width: '65%', flexDirection: 'row' }}>
              <Image source={goalIcon} style={styles.myIcon} />
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>{handleTranslateGoal(userData?.weightGoal!)}</Text>
                <Text style={[styles.text, styles.subText]}>Objetivo</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderRightWidth: 1 }]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image source={PhysicalConditioningIcon} style={styles.myIcon} />
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>{handleTranslatePhysicalActivity(userData?.physicalActivity!)}</Text>
                <Text style={[styles.text, styles.subText]}>Condicionamento</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={genderIcon} style={styles.myIcon} />
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>{handleTranslateGender(userData?.sex!)}</Text>
              <Text style={[styles.text, styles.subText]}>Sexo</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 25, width: '90%', borderBottomWidth: 1, borderBottomColor: '#DFD8C8', }} />

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <View style={{ width: '55%', flexDirection: 'row' }}>
              <View style={styles.statsBox}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  onPress={handleImagePicker}>
                  <Image source={editAvatar} style={[styles.myIcon, { width: 32, height: 32 }]} />
                  <Text style={[styles.text, { fontSize: 26, marginStart: 15, }]}>Editar avatar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <View style={{ width: '55%', flexDirection: 'row' }}>
              <View style={styles.statsBox}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => updateDisplayName(newName)}
                >
                  <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={edit} style={[styles.myIcon, { width: 32, height: 32 }]} />
                      <Text style={[styles.text, { fontSize: 26, marginStart: 15, }]}>Editar nome</Text>
                    </View>
                    <TextInput
                      style={{
                        marginTop: 20,
                        height: 50,
                        left: 10,
                        width: '100%',
                        borderColor: 'gray',
                        borderWidth: 0.5,
                        borderRadius: 8,
                        paddingHorizontal: 8,
                        paddingStart: 45,
                        fontSize: 16,
                      }}
                      placeholder={'Atualize seu nome...'}
                      placeholderTextColor={'#52575D'}
                      autoCapitalize="words"
                      value={newName.toString()}
                      textContentType="name"
                      onChangeText={setNewName}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <View style={{ width: '55%', flexDirection: 'row' }}>
              <View style={styles.statsBox}>
                <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={exit} style={[styles.myIcon, { width: 32, height: 32 }]} />
                  <Text style={[styles.text, { fontSize: 26, marginStart: 15, color: 'red' }]}>Sair</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <BottomTab />
    </View >
  );
}