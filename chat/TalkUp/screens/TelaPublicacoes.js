import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListaPublicacao = ({ navigation }) => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [publicacoesUsuario, setPublicacoesUsuario] = useState([]);
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [conteudo, setConteudo] = useState('');
  const [visibilidade, setVisibilidade] = useState('');

  useEffect(() => {
    carregarPublicacoes();
    carregarPerfilUsuario();
  }, []);

  const carregarPublicacoes = async () => {
    try {
      const responsePublicas = await fetch('https://talkup.onrender.com/chat/lista-publicacao/');
      const dataPublicas = await responsePublicas.json();
      setPublicacoes(dataPublicas);
    } catch (error) {
      console.error('Ocorreu um erro ao carregar as publicações:', error);
    }
  };

  const carregarPublicacoesUsuario = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const responseUsuario = await fetch('https://talkup.onrender.com/chat/publicacao/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const dataUsuario = await responseUsuario.json();
      setPublicacoesUsuario(dataUsuario);
    } catch (error) {
      console.error('Ocorreu um erro ao carregar as publicações do usuário:', error);
    }
  };

  const carregarPerfilUsuario = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const responsePerfil = await fetch('https://talkup.onrender.com/chat/perfil/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const dataPerfil = await responsePerfil.json();
      setPerfilUsuario(dataPerfil);
    } catch (error) {
      console.error('Ocorreu um erro ao carregar o perfil do usuário:', error);
    }
  };

  const criarPublicacao = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch('https://talkup.onrender.com/chat/publicacao/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          conteudo: conteudo,
          visibilidade: visibilidade
        })
      });
      const data = await response.json();
      carregarPublicacoesUsuario()//...
      setConteudo('');
      setVisibilidade('');
    } catch (error) {
      console.error('Ocorreu um erro ao criar a publicação:', error);
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

  const TelaPublicacoes = () => {
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

  const SuasPublicacoes = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={publicacoesUsuario}
          renderItem={renderizarPublicacao}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  };

  const PerfilUsuario = () => {
    if (!perfilUsuario) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.bio}>{perfilUsuario.bio}</Text>
        <Text style={styles.dataNascimento}>{perfilUsuario.data_nascimento}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SuasPublicacoes)}
        >
          <Text style={styles.buttonText}>Suas Publicações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(PerfilUsuario)}
        >
          <Text style={styles.buttonText}>Seu Perfil</Text>
        </TouchableOpacity>
      </View>
      <TelaPublicacoes />
      <TextInput
        style={styles.input}
        placeholder="Conteúdo da publicação"
        value={conteudo}
        onChangeText={setConteudo}
      />
      <TextInput
        style={styles.input}
        placeholder="Visibilidade (privado ou público)"
        value={visibilidade}
        onChangeText={setVisibilidade}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={criarPublicacao}
      >
        <Text style={styles.buttonText}>Criar Publicação</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  bio: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataNascimento: {
    fontSize: 12,
    color: '#888888',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    //flex: 1,
    marginRight: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListaPublicacao;
