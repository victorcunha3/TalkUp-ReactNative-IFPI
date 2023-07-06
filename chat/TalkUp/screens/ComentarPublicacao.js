import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const ComentarPublicacaoScreen = () => {
  const [conteudo, setConteudo] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  console.log(id)

  const handleComentarPublicacao = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(
        `https://talkup.onrender.com/chat/comentario/${id}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            conteudo,
          }),
        }
      );
      if (response.status === 201) {
        navigation.navigate('TelaPublicacoes');
        // Comentário criado com sucesso
        // Redirecionar de volta para a lista de publicações ou realizar alguma outra ação
      } else {
        Alert.alert('Erro ao comentar', 'Não foi possível comentar na publicação.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Comentário"
        value={conteudo}
        onChangeText={setConteudo}
      />
      <TouchableOpacity style={styles.button} onPress={handleComentarPublicacao}>
        <Text style = {styles.text}>Comentar</Text>

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
  button: {
    backgroundColor:'#56b870',
    borderRadius:8,
    paddingVertical:10,
    alignItems:'center',
  },
  text: {
    color:'#f5f5f5'
  }
  
});

export default ComentarPublicacaoScreen;
