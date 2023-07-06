import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Feather } from '@expo/vector-icons';

const ListaPublicacaoScreen = () => {
  const [publications, setPublications] = useState([]);
  const [likedPublications, setLikedPublications] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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

  const renderPublicationItem = ({ item }) => {
    const isLiked = likedPublications.includes(item.id);

    const handleLike = async (id) => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await fetch(`https://talkup.onrender.com/chat/publicacao/${id}/curtir/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          // Atualiza o estado de curtidas com a nova publicação curtida
          setLikedPublications([...likedPublications, id]);
        } else {
          console.error('Erro ao curtir a publicação');
        }
      } catch (error) {
        console.error(error);
      }
    };
    

    return (
      <View style={styles.publicationContainer}>
        <Text style={styles.author}>@{item.autor}</Text>
        <Text style={styles.content}>Post: {item.conteudo}</Text>
        <Text style={styles.date}>Data de Publicação: {item.data_publicacao}</Text>
        <Text style={styles.date}>Status: {item.visibilidade}</Text>

        {/* Ícone de curtir */}
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          {likedPublications.includes(item.id) ? (
          <Feather name="heart" size={24} color="red" />
          ) : (
          <Feather name="heart" size={24} color="black" />
          )}
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ComentarPublicacao', { id: item.id })}
        >
          <Text style={styles.buttonText}>Comentar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('VerComentarios', { id: item.id })}
        >
          <Text style={styles.buttonText}>Ver Comentários</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const navigateToProfile = () => {
    navigation.navigate('PerfilUsuario');
  };

  const navigateToUserPrivate = () => {
    navigation.navigate('SuasPublicacoes');
  };

  const navigateCriar = () => {
    navigation.navigate('CriarPublicacao');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleSidebar}>
          <FontAwesome name={showSidebar ? 'times' : 'bars'} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Feed </Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        <FlatList
          data={publications}
          renderItem={renderPublicationItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>

      {showSidebar && <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />}

      {showSidebar && (
        <View style={styles.sideBar}>
          <TouchableOpacity style={styles.sidebarButton} onPress={navigateToProfile}>
            <FontAwesome name="user" size={24} color="white" />
            <Text style={styles.buttonText}>Ver Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarButton} onPress={navigateToUserPrivate}>
            <FontAwesome name="file" size={24} color="white" />
            <Text style={styles.buttonText}>Suas Publicações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarButton} onPress={navigateCriar}>
            <FontAwesome name="plus" size={24} color="white" />
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#56b870',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  publicationContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom:16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  content: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555555',
  },
  date: {
    fontSize: 12,
    color: '#888888',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#56b870',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  buttonText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sideBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 200,
    backgroundColor: '#43a95e',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  sidebarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ListaPublicacaoScreen;
