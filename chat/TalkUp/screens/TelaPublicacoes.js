import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ListaPublicacao = () => {
  const [publicacoes, setPublicacoes] = useState([]);

  useEffect(() => {
    carregarPublicacoes();
  }, []);

  const carregarPublicacoes = async () => {
    try {
      const response = await fetch('https://talkup.onrender.com/chat/lista-publicacao/');
      const data = await response.json();
      setPublicacoes(data);
    } catch (error) {
      console.error('Ocorreu um erro ao carregar as publicações:', error);
    }
  };

  const renderizarPublicacao = ({ item }) => {
    return (
      <View style={styles.publicacaoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.autor}>{item.autor}</Text>
          <Text style={styles.data}>{item.data_publicacao}</Text>
        </View>
        <Text style={styles.conteudo}>{item.conteudo}</Text>
        <View style={styles.footerContainer}>
          <Text style={styles.comentarios}>{item.comentarios.length} Comentários</Text>
          <Text style={styles.curtidas}>{item.curtidas.length} Curtidas</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={publicacoes}
        renderItem={renderizarPublicacao}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  publicacaoContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 6,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  autor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 12,
    color: '#888888',
  },
  conteudo: {
    fontSize: 14,
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comentarios: {
    fontSize: 12,
    color: '#888888',
  },
  curtidas: {
    fontSize: 12,
    color: '#888888',
  },
});

export default ListaPublicacao;
