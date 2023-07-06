import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilScreen = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch('https://talkup.onrender.com/chat/perfil/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });
      const data = await response.json();
      setProfile(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch('https://talkup.onrender.com/chat/perfil/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
          bio: bio,
          data_nascimento: dataNascimento,
        }),
      });
      if (response.ok) {
        // Atualiza o perfil após a alteração ser feita com sucesso
        fetchUserProfile();
        setEditMode(false); // Desativa o modo de edição
      } else {
        console.error('Erro ao atualizar o perfil');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {profile ? (
        <View>
          <Image
            style={styles.avatar}
            source={{ uri: profile.avatar }}
          />
          <Text style={styles.username}>{profile.username}</Text>
          <Text style={styles.bioText}>Bio: {profile.bio}</Text>
          <Text style={styles.birthDateText}>
            Data de Nascimento: {profile.data_nascimento}
          </Text>
          {!editMode && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditMode(true)}
            >
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          )}
          {editMode && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Nova Bio"
                value={bio}
                onChangeText={setBio}
              />
              <TextInput
                style={styles.input}
                placeholder="Formato: ano-mês-dia"
                value={dataNascimento}
                onChangeText={setDataNascimento}
              />
              <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditMode(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5' },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  birthDateText: {
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PerfilScreen;
