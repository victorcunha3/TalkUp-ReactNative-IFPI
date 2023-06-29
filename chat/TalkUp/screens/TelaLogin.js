import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const TelaLogin = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = "https://talkup.onrender.com/chat/token/";

  const navigation = useNavigation();

  const validarCampos = () => {
    if (nomeUsuario.trim() === '' || senha.trim() === '') {
      Alert.alert('Campos inválidos', 'Preencha todos os campos');
      return false;
    }
    return true;
  };

  const realizarLogin = () => {
    if (!validarCampos()) {
      return;
    }

    setLoading(true);

    const usuario = {
      username: nomeUsuario,
      password: senha,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Usuário ou senha inválidos');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.access) { 
        const token = data.access;
        AsyncStorage.setItem('access_token', token);
        navigation.navigate("TelaPublicacoes");
      } else {
        throw new Error('Ocorreu um erro durante o login. Tente novamente.');
      }
    })
    .catch(error => {
      console.error("Ocorreu um erro durante o login:", error);
      Alert.alert("Erro", error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const redirecionarParaRegistro = () => {
    navigation.navigate('TelaRegistro');
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle" size={64} color="#007bff" style={styles.icon} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={realizarLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator style={styles.loadingIndicator} />}
      <Text style={styles.link} onPress={redirecionarParaRegistro}>
        Não tem uma conta? Clique aqui para se registrar.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 30,
  },
  icon: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    marginBottom:20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 10,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default TelaLogin;
