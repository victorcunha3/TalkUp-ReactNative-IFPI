import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const ListaPublicacaoScreen = () => {
  const [publications, setPublications] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch(
          'https://talkup.onrender.com/chat/lista-publicacao/',
          {
            headers: {
              'Content-Type': 'application/json',
            },
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
      <Text style={styles.date}>Visibilidade: {item.visibilidade}</Text>
      {item.comentarios &&
        item.comentarios.map((comentario, index) => (
          <Text key={index} style={styles.comment}>
            Comentário: {comentario.conteudo}
          </Text>
        ))}
      <Button
        title="Comentar"
        onPress={() => navigation.navigate('ComentarPublicacao', { id: item.id })}
      />
      <Button
        title="Ver Comentários"
        onPress={() => navigation.navigate('VerComentarios', { id: item.id })}
      />
    </View>
  );

  const navigateToProfile = () => {
    navigation.navigate('PerfilUsuario');
  };

  const navigateToUserPrivate = () => {
    navigation.navigate('SuasPublicacoes');
  };

  const navigateCriar = () => {
    navigation.navigate('CriarPublicacao');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Publicações:</Text>
      <FlatList
        data={publications}
        renderItem={renderPublicationItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
        <FontAwesome name="user" size={24} color="white" />
        <Text style={styles.buttonText}>Ver Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToUserPrivate}>
        <FontAwesome name="file" size={24} color="white" />
        <Text style={styles.buttonText}>Suas Publicações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateCriar}>
        <FontAwesome name="plus" size={24} color="white" />
        <Text style={styles.buttonText}>Criar</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  publicationContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
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
    color: '#888888',
  },
  comment: {
    fontSize: 12,
    color: '#888888',
    marginLeft: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  buttonText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListaPublicacaoScreen;
