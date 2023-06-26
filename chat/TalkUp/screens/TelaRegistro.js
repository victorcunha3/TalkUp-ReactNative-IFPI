import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TelaRegistro = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = "https://talkup.onrender.com/chat/signup/";

  const navigation = useNavigation();

  const validarCampos = () => {
    if (nomeUsuario.trim() === '' || senha.trim() === '' || email.trim() === '') {
      Alert.alert('Campos inválidos', 'Preencha todos os campos');
      return false;
    }
    return true;
  };

  const realizarRegistro = () => {
    if (!validarCampos()) {
      return;
    }
    setLoading(true);

    const usuario = {
      username: nomeUsuario,
      email: email,
      password: senha,
    };

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro de registro');
        }
        return response.json();
      })
      .then(data => {
        const token = data.access;
        AsyncStorage.setItem('access_token', token);
        navigation.navigate('TelaLogin');
        Alert.alert("Conta Criada Com Sucesso!")
      })
      .catch(error => {
        console.error("Ocorreu um erro durante o registro:", error);
        Alert.alert("Erro", "Ocorreu um erro durante o registro. Verifique sua conexão e tente novamente.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const redirecionarParaLogin = () => {
    navigation.navigate('TelaLogin');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={realizarRegistro}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator style={styles.loadingIndicator} />}
      <Text style={styles.link} onPress={redirecionarParaLogin}>
        Já possui uma conta? Clique aqui para entrar.
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
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

export default TelaRegistro;
