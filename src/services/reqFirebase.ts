import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes, AuthError } from "firebase/auth";

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