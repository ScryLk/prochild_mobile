import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '~/components/headerButtons/Header/header';
import { Phone, Info, Calendar } from 'lucide-react-native';
import { FAB } from 'react-native-paper';

export default function HealthCenterDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [healthCenter, setHealthCenter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Cookie', 'csrftoken=kIXQNyPmD8kZSIkPOTj6mWZdE2GhtKnu');
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const response = await fetch(`http://127.0.0.1:8000/healthcenters/${id}`, requestOptions);
        const result = await response.json();
        setHealthCenter(result['Centro de Saúde']);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os detalhes.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id]);

  const handleEdit = () => {
    setOpen(false);
    router.push(`/pages/health-centers/health-center-details/${id}/edit`);
  };

  const handleDelete = async () => {
    setOpen(false);
    Alert.alert(
      'Excluir',
      'Tem certeza que deseja excluir este centro de saúde?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const myHeaders = new Headers();
              myHeaders.append('Cookie', 'csrftoken=kIXQNyPmD8kZSIkPOTj6mWZdE2GhtKnu');
              const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow',
              };
              const response = await fetch(`http://127.0.0.1:8000/healthcenters/delete/${id}`, requestOptions);
              if (response.ok) {
                Alert.alert('Sucesso', 'Centro de saúde excluído!');
                router.back();
              } else {
                Alert.alert('Erro', 'Não foi possível excluir.');
              }
            } catch (error) {
              Alert.alert('Erro', 'Erro ao excluir.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3461FD" />
      </View>
    );
  }

  if (!healthCenter) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Centro de saúde não encontrado.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Detalhes do Centro"
        showFilter={false}
        showBackButton={true}
        showPlusButton={false}
      />
      <View className="flex-1 p-6">
        <View className="mb-6">
          <Text className="text-3xl">{healthCenter.nome}</Text>
        </View>

        <View className="mb-4 flex-row items-center">
          <Phone color="#3461FD" size={20} />
          <Text className="ml-2 text-lg text-gray-700">Telefone: {healthCenter.telefone}</Text>
        </View>

        <View className="mb-4 flex-row items-center">
          <Info color="#3461FD" size={20} />
          <Text className="ml-2 text-lg text-gray-700">
            {healthCenter.descricao ? healthCenter.descricao : 'Sem descrição'}
          </Text>
        </View>

        <View className="mb-2 flex-row items-center">
          <Calendar color="#3461FD" size={18} />
          <Text className="ml-2 text-gray-500">
            Criado em: {new Date(healthCenter.created_at).toLocaleString()}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Calendar color="#3461FD" size={18} />
          <Text className="ml-2 text-gray-500">
            Atualizado em: {new Date(healthCenter.updated_at).toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Speed Dial */}
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'pen'}
        actions={[
          {
            icon: 'pencil',
            label: 'Editar',
            onPress: handleEdit,
            color: '#3461FD',
            style: { backgroundColor: '#e0e7ff' },
          },
          {
            icon: 'trash-can',
            label: 'Excluir',
            onPress: handleDelete,
            color: '#dc2626',
            style: { backgroundColor: '#fee2e2' },
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
        onPress={() => {
          if (open) setOpen(false);
        }}
      />
    </View>
  );
}