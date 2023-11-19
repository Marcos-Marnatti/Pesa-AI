import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes, AuthError, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { UserService } from "src/@types/User";
import axios from "axios";

function firebaseErrors(error: AuthError) {
  let message = '';

  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      message = 'Este e-mail já está em uso.';
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      message = 'E-mail inválido.';
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      message = 'Sua senha deve ter no minímo 6 caracteres.';
      break;
    default:
      message = 'Erro desconhecido.';
      break;
  }
  return message;
}

export async function handleSignUp({ email, password }: { email: string; password: string; }) {
  const result = createUserWithEmailAndPassword(auth, email, password)
    .then((userData) => {
      console.log(userData)
      return 'sucesso'
    })
    .catch((error) => {
      console.log(error)
      return firebaseErrors(error);
    });

  return result;
}

export async function handleResetPassword(email: string) {
  const result = sendPasswordResetEmail(auth, email)
    .then(() => 'sucesso')
    .catch((error) => {
      console.log(error)
      return 'erro'
    });
    return result;
}

export async function handleSignIn({ email, password }: { email: string; password: string; }) {
  const result = signInWithEmailAndPassword(auth, email, password)
    .then((userData) => {
      console.log(userData)
      return 'sucesso'
    })
    .catch((error) => {
      console.log(error)
      return 'erro'
    });

  return result;
}

export async function handleSignUpAPI({ name, email, sex, password, age, size, weight, physicalActivity, weightGoal }: UserService) {

  const data = JSON.stringify({
    "name": name,
    "email": email,
    "sex": sex,
    "password": password,
    "age": age,
    "size": size,
    "weight": weight,
    "physicalActivity": physicalActivity,
    "weightGoal": weightGoal
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://192.168.0.18:8080/user',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  const result = axios.request(config)
    .then((userData) => {
      console.log(userData)
      return 'sucesso'
    })
    .catch((error) => {
      console.log(error)
      return firebaseErrors(error);
    });

  return result;
}

export async function handleGetUserData(email: string) {

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://192.168.0.18:8080/user?email=${email}`,
    headers: {}
  };

  const result = axios.request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
}