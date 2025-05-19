import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Header from '~/components/headerButtons/Header/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import { HeartPlus } from 'lucide-react-native';

type HealthCenter = {
  id: number;
  nome: string;
  endereco: string;
  descricao: string;
  telefone: string;
};

export default function EmergencyCalls() {
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  useEffect(() => {
    const getUserIdAndFetch = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (storedUserId) {
          setUserId(Number(storedUserId));
        } else {
          Alert.alert('Erro', 'Usuário não encontrado.');
          setLoading(false);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível recuperar o usuário.');
        setLoading(false);
      }
    };
    getUserIdAndFetch();
  }, []);

  useEffect(() => {
    if (userId === null) return;

    const fetchHealthCenters = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Cookie', 'csrftoken=kIXQNyPmD8kZSIkPOTj6mWZdE2GhtKnu');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/healthcenters/healthcenters/users/${userId}`,
          requestOptions
        );
        const result = await response.json();

        if (response.ok && Array.isArray(result.success)) {
          setHealthCenters(result.success);
        } else {
          setHealthCenters([]);
        }
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao buscar os centros de saúde.');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthCenters();
  }, [userId]);

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Disque Emergência"
        showFilter={false}
        showBackButton={true}
        showPlusButton={false}
      />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3461FD" />
        </View>
      ) : (
        <View className="p-4">
          {healthCenters.length > 0 ? (
            <RadioButton.Group onValueChange={setSelectedId} value={selectedId}>
              <FlatList
                data={healthCenters}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedId(String(item.id))}
                    className="mb-4 flex-row items-center justify-between bg-white px-3 py-2"
                    activeOpacity={0.8}>
                    {/* Ícone à esquerda */}
                    <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <HeartPlus />
                    </View>
                    {/* Nome ao centro */}
                    <Text className="flex-1 text-base font-bold text-neutral-800">{item.nome}</Text>
                    {/* Círculo maior para o radio */}
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <RadioButton
                        value={String(item.id)}
                        status={selectedId === String(item.id) ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedId(String(item.id))}
                        color="#0077B6"
                        uncheckedColor="#bbb"
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </RadioButton.Group>
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-500">Nenhum centro de saúde encontrado.</Text>
            </View>
          )}

          {/* Botão de emergência */}
          <View className="mt-8 items-center">
            <TouchableOpacity
              className={`rounded-3xl px-8 py-3 ${selectedId ? 'bg-red-600' : 'bg-gray-300'}`}
              onPress={() => {
                const selected = healthCenters.find((hc) => String(hc.id) === selectedId);
                if (selected?.telefone) {
                  Linking.openURL(`tel:${selected.telefone}`);
                } else {
                  Alert.alert('Erro', 'Telefone não encontrado para este centro de saúde.');
                }
              }}
              disabled={!selectedId}
              activeOpacity={selectedId ? 0.7 : 1}>
              <Text
                className={`text-base font-bold ${selectedId ? 'text-white' : 'text-gray-400'}`}>
                Disque Emergência
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
