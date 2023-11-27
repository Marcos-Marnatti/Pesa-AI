import { useState } from "react";
import { View, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';

import union from '@assets/union.png'

import { HeaderPesaAi } from "@components/HeaderPesaAi";
import { BottomPesaAi } from "@components/BottomPesaAi";

import { StackTypes } from "src/@types/StackNavigator";
import { handleResetPassword, handleSignIn } from "../../services/reqFirebase";

import { styles } from './styles';

export function SignIn() {
  const navigation = useNavigation<StackTypes>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]');

  async function onSignInHandle() {
    if (email.length === 0 || password.length === 0) {
      return Alert.alert("Campo vazio", "Preencha todos os campos.");
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Email inválido", "Preencha o campo corretamente.");
      return false;
    }

    const response = await handleSignIn({ email, password });

    return response;
  }

  async function onForgotPasswordHandle(email: string) {
    if (email.length === 0) {
      return Alert.alert("Campo E-mail vazio", "Preencha o campo E-mail.");
    }

    await handleResetPassword(email)
      .then((response) => {
        if (response === 'sucesso') {
          return (
            Alert.alert("Enviamos um e-mail para você redefinir sua senha.")
          )
        }
      }).catch((error) => {
        return Alert.alert("Erro desconhecido.")
      })
  }

  return (
    <View style={styles.container}>
      <HeaderPesaAi />

      <ImageBackground source={union} style={styles.body}>
        <BlurView intensity={30} style={styles.contentContainer} >
          <View>
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

            <TouchableOpacity
              onPress={async () => await onForgotPasswordHandle(email)}>
              <Text style={styles.forgetText}> Esqueceu sua senha ?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button}
            onPress={async () => {
              const response = await onSignInHandle();
              if (response == 'erro') {
                return (
                  Alert.alert("Erro de autenticação", "E-mail ou Senha não conferem")
                )
              }
            }}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signupFirstText}>Ainda não é membro? </Text>
            <TouchableOpacity
              onPress={() => navigation.replace('SignUp')}>
              <Text style={styles.signupSecondText}> Inscreva-se aqui</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
        <BottomPesaAi />
      </ImageBackground>
    </View >
  );
}