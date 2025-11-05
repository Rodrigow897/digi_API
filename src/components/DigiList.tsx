import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import api from '../services/api';
import styles from './styles';

export default function DigiList() {
  interface Digimon {
      id: number;
      name: string;
      image: string;
      levels?: { level: string }[];
    }
  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDigimons = async () => {
      try {
        const response = await api.get('/digimon?pageSize=20'); 
       
        setDigimons(response.data.content);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar Digimons 😢');
      } finally {
        setLoading(false);
      }
    };

    fetchDigimons();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#004AAD" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={digimons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.level}>{item.levels?.[0]?.level || 'Sem nível'}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}