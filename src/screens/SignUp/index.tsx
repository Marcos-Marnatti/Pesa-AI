import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BlurView } from 'expo-blur';

import union from '@assets/union.png'

import { HeaderPesaAi } from "@components/HeaderPesaAi";
import { BottomPesaAi } from "@components/BottomPesaAi";

import { StackTypes } from "src/@types/StackNavigator";

import { styles } from './styles';

export function SignUp() {
  const navigation = useNavigation<StackTypes>();
  const emailRegex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]');
  const nameRegex = new RegExp('^[a-zA-Z ]+$');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function onSignUpHandleEmptyInput() {
    if (email.length === 0 || password.length === 0 || passwordConfirm.length === 0) {
      Alert.alert("Campo vazio", "Preencha todos os campos.");
      return false;
    }

    if (!nameRegex.test(name)) {
      Alert.alert("Nome inválido", "Preencha o campo corretamente.");
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Email inválido", "Preencha o campo corretamente.");
      return false;
    }

    if (password !== passwordConfirm) {
      Alert.alert("Verifique sua senha", "As senhas nao conferem.")
      return false;
    }
    return true;
  }

  return (
    <View style={styles.container}>
      <HeaderPesaAi />
      <ImageBackground source={union} style={styles.body}>
        <BlurView intensity={30} style={styles.contentContainer} >
          <View>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              keyboardType="name-phone-pad"
              autoCapitalize="none"
              textContentType="name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="password"
              value={passwordConfirm}
              onChangeText={(text) => setPasswordConfirm(text)}
            />
          </View>

          <TouchableOpacity style={styles.button}
            onPress={() => {
              const response = onSignUpHandleEmptyInput();
              if (response) {
                //@ts-ignore
                navigation.navigate('SignupAnamnese', {
                  response: {
                    name: name,
                    email: email,
                    password: password,
                  }
                })
              }
            }}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signupFirstText}>Já é membro? </Text>
            <TouchableOpacity
              onPress={() => navigation.replace('SignIn')}>
              <Text style={styles.signupSecondText}> Entre aqui</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
        <BottomPesaAi />
      </ImageBackground>
    </View >
  );
}