import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const typeColors: Record<string, string> = {
  vaccine: '#FF5733',
  data: '#33C1FF',
  virus: '#D32F2F',
  free: '#9C27B0',
};

interface DigimonModalProps {
  visible: boolean;
  onClose: () => void;
  digimon: any | null;
}

export default function DigimonModal({ visible, onClose, digimon }: DigimonModalProps) {
  if (!digimon) return null;

  // Extrai e trata campos com fallback seguro
  const name = digimon.name || 'Desconhecido';
  const image = digimon.images?.[0]?.href || 'https://via.placeholder.com/150';
  const types = digimon.types?.map((t: any) => t.type) || ['Desconhecido'];
  const levels = digimon.levels?.map((l: any) => l.level) || [];
  const attributes = digimon.attributes?.map((a: any) => a.attribute) || [];

  const mainType = types[0]?.toLowerCase() || 'vaccine';
  const backgroundColor = typeColors[mainType] || '#f2f2f2';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={28} color="white" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.content}>
            <Image source={{ uri: image }} style={styles.image} />

            <Text style={styles.name}>{name.toUpperCase()}</Text>

            <Text style={styles.label}>Tipo(s):</Text>
            <Text style={styles.value}>{types.join(', ')}</Text>

            {levels.length > 0 && (
              <>
                <Text style={styles.label}>Nível:</Text>
                <Text style={styles.value}>{levels.join(', ')}</Text>
              </>
            )}

            {attributes.length > 0 && (
              <>
                <Text style={styles.label}>Atributos:</Text>
                <Text style={styles.value}>{attributes.join(', ')}</Text>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
