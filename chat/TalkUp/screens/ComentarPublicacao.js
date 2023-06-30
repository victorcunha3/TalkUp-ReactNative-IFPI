import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const ComentarPublicacaoScreen = () => {
  const [comentario, setComentario] = useState('');
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
            comentario,
          }),
        }
      );
      if (response.status === 200) {
        navigation.navigate('ListaPublicacao');
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
        value={comentario}
        onChangeText={setComentario}
      />
      <Button
        style={styles.button}
        title="Comentar"
        onPress={handleComentarPublicacao}
      />
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
});

export default ComentarPublicacaoScreen;
