import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


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
import { SignupAnamnese } from '@screens/SignUpAnamenese';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  const { currentUser, isLoading } = useContext(AuthenticatedUserContext);

  return (
    <NavigationContainer >
      {!currentUser && isLoading ? (
        <Loading />
      ) : !currentUser && !isLoading ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='SignIn' component={SignIn} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='SignupAnamnese' component={SignupAnamnese} />
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

