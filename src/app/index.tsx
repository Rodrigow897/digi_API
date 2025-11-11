import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DigiModal from '../components/DigiModal/digiModal';
import styles from './styles';

interface Digimon {
  name: string;
  image: string;
  types: string[];
  url?: string;
}

const typeColors: Record<string, string> = {
  vaccine: '#FF5733',
  data: '#33C1FF',
  virus: '#D32F2F',
  free: '#9C27B0',
};

export default function Index() {
  const [search, setSearch] = useState('');
  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDigimon, setSelectedDigimon] = useState<any | null>(null);

  // 🔹 Carrega os Digimons
  async function loadDigimons() {
    try {
      setLoading(true);
      const response = await axios.get('https://digi-api.com/api/v1/digimon?page=0&pageSize=20');
      const results = response.data.content;

      // Buscar detalhes individuais (para pegar imagem e tipo)
      const detailedData = await Promise.all(
        results.map(async (d: { name: string; href: string }) => {
          const res = await axios.get(d.href);
          const digi = res.data;

          return {
            name: digi.name,
            image: digi.images?.[0]?.href || 'https://via.placeholder.com/150',
            types: digi.types?.map((t: any) => t.type) || ['Desconhecido'],
            url: d.href,
          };
        })
      );

      setDigimons(detailedData);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao carregar os Digimons.');
    } finally {
      setLoading(false);
    }
  }

  // 🔎 Buscar por nome
  async function handleSearch() {
    const query = search.trim().toLowerCase();

    if (!query) {
      loadDigimons();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('https://digi-api.com/api/v1/digimon?page=0&pageSize=1000');
      const results = response.data.content;

      const filtered = results.filter((d: { name: string }) =>
        d.name.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        Alert.alert('Erro', 'Nenhum Digimon encontrado com essas letras.');
        setDigimons([]);
        return;
      }

      const detailedData = await Promise.all(
        filtered.slice(0, 20).map(async (d: { name: string; href: string }) => {
          const res = await axios.get(d.href);
          const digi = res.data;

          return {
            name: digi.name,
            image: digi.images?.[0]?.href || 'https://via.placeholder.com/150',
            types: digi.types?.map((t: any) => t.type) || ['Desconhecido'],
            url: d.href,
          };
        })
      );

      setDigimons(detailedData);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao buscar os Digimons.');
    } finally {
      setLoading(false);
    }
  }

  // 🧩 Abrir modal
  async function openModal(digimon: Digimon) {
    try {
      const response = await axios.get(digimon.url!);
      setSelectedDigimon(response.data);
      setModalVisible(true);
    } catch {
      Alert.alert('Erro', 'Falha ao carregar detalhes do Digimon');
    }
  }

  useEffect(() => {
    loadDigimons();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DIGIPEDIA</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Busque pelo nome"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />

          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <MaterialIcons name="search" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff0000" />
        ) : (
          <FlatList
            data={digimons}
            keyExtractor={(item) => item.name}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => {
              const mainType = item.types[0]?.toLowerCase() || 'vaccine';
              const backgroundColor = typeColors[mainType] || '#f2f2f2';

              return (
                <TouchableOpacity
                  style={[styles.card, { backgroundColor }]}
                  onPress={() => openModal(item)}
                >
                  <Image source={{ uri: item.image }} style={styles.digimonImage} />
                  <Text style={styles.digimonName}>{item.name}</Text>
                  <Text style={styles.digimonTypes}>{item.types.join(', ')}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <DigiModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        digimon={selectedDigimon}
      />
    </SafeAreaView>
  );
}
