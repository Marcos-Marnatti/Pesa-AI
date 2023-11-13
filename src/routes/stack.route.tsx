import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { Home } from '@screens/Home';
import { Meals } from '@screens/Meals/index';
import { Anamnese } from '@screens/Anamnese';
import { Profile } from '@screens/Profile';
import { GenerateDiet } from '@screens/GenerateDiet';
import { ChatIA } from '@screens/Chat';
import { GenerateDietResponse } from '@screens/GenerateDietResponse';

import { Loading } from '@components/Loading';

import { AuthenticatedUserContext } from '../context/AuthenticationContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const Stack = createNativeStackNavigator();

type StackNavigator = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Meals: undefined;
  Anamnese: undefined;
  Profile: undefined;
  GerarDieta: undefined;
  GerarDietaResposta: undefined;
  Chat: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigator>;

export function StackNavigator() {
  //@ts-ignore
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer >
      {!user && isLoading ? (
        <Loading />
      ) : !user && !isLoading ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='SignIn' component={SignIn} />
          <Stack.Screen name='SignUp' component={SignUp} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Meals' component={Meals} />
          <Stack.Screen name='Chat' component={ChatIA} />
          <Stack.Screen name='Anamnese' component={Anamnese} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='GerarDieta' component={GenerateDiet} />
          <Stack.Screen name='GerarDietaResposta' component={GenerateDietResponse} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

