import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerComentariosScreen = ({ route }) => {
  const { id } = route.params;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await fetch(
          `https://talkup.onrender.com/chat/comentario/${id}/`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [id]);

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.author}>Autor: {item.autor}</Text>
      <Text style={styles.content}>Conteúdo: {item.conteudo}</Text>
      <Text style={styles.date}>Data de Publicação: {item.data_publicacao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentários da Publicação {id}:</Text>
      <FlatList
      data={comments}
      renderItem={renderCommentItem}
      keyExtractor={(item) => item?.id?.toString() || ''}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  commentContainer: {
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
});

export default VerComentariosScreen;
