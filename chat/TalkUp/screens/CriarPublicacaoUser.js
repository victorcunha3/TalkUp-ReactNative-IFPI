import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CriarPublicacaoScreen = () => {
  const [conteudo, setConteudo] = useState('');
  const [visibilidade, setVisibilidade] = useState('publico');
  const navigation = useNavigation();

  const handleCriarPublicacao = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(
        'https://talkup.onrender.com/chat/publicacao/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            conteudo,
            visibilidade,
          }),
        }
      );
      if (response.ok) {
        navigation.navigate('TelaPublicacoes');

        // Publicação criada com sucesso
        // Redirecionar para a lista de publicações ou realizar alguma outra ação
      } else {
        // Tratar erro de criação de publicação
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Conteúdo"
        value={conteudo}
        onChangeText={setConteudo}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, visibilidade === 'publico' && styles.buttonSelected]}
          onPress={() => setVisibilidade('publico')}
          disabled={visibilidade === 'publico'}
        >
          <Text style={[styles.buttonText, visibilidade === 'publico' && styles.buttonTextSelected]}>Público</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, visibilidade === 'privado' && styles.buttonSelected]}
          onPress={() => setVisibilidade('privado')}
          disabled={visibilidade === 'privado'}
        >
          <Text style={[styles.buttonText, visibilidade === 'privado' && styles.buttonTextSelected]}>Privado</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCriarPublicacao}
      >
        <Text style={styles.createButtonText}>Criar Publicação</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#e9e9e9',
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: '#555555',
  },
  buttonSelected: {
    backgroundColor: '#007bff',
  },
  buttonTextSelected: {
    color: '#ffffff',
  },
  createButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  createButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default CriarPublicacaoScreen;
