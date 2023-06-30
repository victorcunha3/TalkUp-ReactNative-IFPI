import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ListaPublicacaoUser = () => {
  const [publications, setPublications] = useState([]);
  //const navigation = useNavigation();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await fetch(
          'https://talkup.onrender.com/chat/publicacao/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method:"GET"
          }
        );
        const data = await response.json();
        setPublications(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPublications();
  }, []);

  const renderPublicationItem = ({ item }) => (
    <View style={styles.publicationContainer}>
      <Text style={styles.author}>Autor: {item.autor}</Text>
      <Text style={styles.content}>Conteúdo: {item.conteudo}</Text>
      <Text style={styles.date}>Data de Publicação: {item.data_publicacao}</Text>
      <Text style={styles.date}>visibilidade: {item.visibilidade}</Text>
      {/* Renderizar outros detalhes da publicação, como curtidas e comentários */}
    </View>
  );

  /*const navigateToProfile = () => {
    navigation.navigate('PerfilUsuario');
  };*/

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Publicações:</Text>
      <FlatList
        data={publications}
        renderItem={renderPublicationItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  publicationContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default ListaPublicacaoUser;
