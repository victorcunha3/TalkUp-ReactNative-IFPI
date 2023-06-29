import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilScreen = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await fetch(
          'https://talkup.onrender.com/chat/perfil/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          }
        );
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      {profile ? (
        <View>
          <Text style={styles.bioText}>Bio: {profile.bio}</Text>
          <Text style={styles.birthDateText}>
            Data de Nascimento: {profile.data_nascimento}
          </Text>
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
    backgroundColor: '#f5f5f5',
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
});

export default PerfilScreen;
