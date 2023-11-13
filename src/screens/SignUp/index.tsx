import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BlurView } from 'expo-blur';

import { HeaderPesaAi } from "@components/HeaderPesaAi";
import { BottomPesaAi } from "@components/BottomPesaAi";

import { handleSignUp } from "../../services/reqFirebase";

import union from '@assets/union.png'
import { styles } from './styles';
import { StackTypes } from "@routes/stack.route";

export function SignUp() {
  const navigation = useNavigation<StackTypes>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  async function onSignUpHandle() {
    if (email.length === 0 || password.length === 0 || passwordConfirm.length === 0) {
      return Alert.alert("Campo vazio", "Preencha todos os campos.");
    }
    if (password !== passwordConfirm) {
      return Alert.alert("Verifique sua senha", "As senhas nao conferem.")
    }
    const response = await handleSignUp({ email, password });

    return response;
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
            onPress={
              async () => {
                const response = await onSignUpHandle();
                console.log(response)
                if (response != 'sucesso' && response != undefined) {
                  return (
                    Alert.alert(`${response}`)
                  )
                }
              }}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
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