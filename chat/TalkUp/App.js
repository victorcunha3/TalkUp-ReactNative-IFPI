import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
import TelaLogin from "./screens/TelaLogin";
import TelaRegistro from "./screens/TelaRegistro";
import TelaPublicacoes from "./screens/TelaPublicacoes"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name='TelaRegistro' component={TelaRegistro} />
        <Stack.Screen name='TelaPublicacoes' component={TelaPublicacoes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};