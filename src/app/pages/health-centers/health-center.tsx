import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Header from '~/components/headerButtons/Header/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronRight } from 'lucide-react-native';
import { useRouter, Link } from 'expo-router';
import routes from '~/routes/routes';

type HealthCenter = {
  id: number;
  nome: string;
  endereco: string;
  descricao: string;
  // adicione outros campos conforme necessário
};

export default function HealthCenter() {
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

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

        if (response.ok) {
          setHealthCenters(result.success); // Corrigido para acessar o array correto
        } else {
          Alert.alert('Erro', 'Não foi possível carregar os centros de saúde.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao buscar os centros de saúde.');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthCenters();
  }, [userId]);

  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Centros de Saúde"
        showFilter={false}
        showBackButton={true}
        showPlusButton={true}
        plusButtonRoute={routes.AddHealthCenter} // exemplo de rota dinâmica
      />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3461FD" />
        </View>
      ) : (
        <View>
          <FlatList
            data={healthCenters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row items-center justify-between  border-gray-200 p-4"
                onPress={() =>
                  router.push({
                    pathname: routes.healthCenterDetails,
                    params: { id: item.id },
                  })
                }>
                <View>
                  <Text className="text-lg font-bold">{item.nome}</Text>
                  <Text className="text-gray-600">{item.descricao}</Text>
                </View>
                <ChevronRight color="#000" size={24} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-500">Nenhum centro de saúde encontrado.</Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}
