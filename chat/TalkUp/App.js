import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
import TelaLogin from "./screens/TelaLogin";
import TelaRegistro from "./screens/TelaRegistro";
import ListaPublicacao from "./screens/TelaPublicacoes";
import PerfilUsuario from "./screens/TelaPublicacoes";

const Stack = createNativeStackNavigator();

const App = () => {
  const headerOptions = {
    headerStyle: {
      backgroundColor: '#4287f5',
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={headerOptions}
      >
        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="TelaRegistro"
          component={TelaRegistro}
          options={{ title: 'Registro' }}
        />
        <Stack.Screen
          name="TelaPublicacoes"
          component={ListaPublicacao}
          options={{ title: 'Publicações' }}
        />
        <Stack.Screen
          name="SuasPublicacoes"
          component={ListaPublicacao}
          options={{ title: 'Suas Publicações' }}
        />
        <Stack.Screen
          name="PerfilUsuario"
          component={PerfilUsuario}
          options={{ title: 'Perfil do Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
