import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";

type Training = {
  id: string;
  titulo: string;
  descricao: string;
  arquivo_nome: string;
  arquivo_caminho: string;
};

export default function Trainings() {
  const { categoryId, categoryName } = useLocalSearchParams(); // Obtém os parâmetros da URL
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/trainings/trainings/categorie/${categoryId}`);
        const data = await response.json();

        if (data.success && Array.isArray(data.success)) {
          setTrainings(data.success); // Atualiza o estado com os treinamentos
        } else {
          console.error("Nenhum treinamento encontrado:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar treinamentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, [categoryId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3461FD" />
      </View>
    );
  }

  return (
    <View className="p-4">
      <Text className="text-[22px] font-bold mb-4">Treinamentos de {categoryName}</Text>
      {trainings.length > 0 ? (
        <FlatList
          data={trainings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mb-4 p-4 border border-gray-300 rounded-md">
              <Text className="text-[18px] font-bold">{item.titulo}</Text>
              <Text className="text-[16px] text-gray-600">{item.descricao}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(item.arquivo_caminho)}>
                <Text className="text-[14px] text-blue-500 underline">{item.arquivo_nome}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text className="text-[16px] text-gray-500">Nenhum treinamento encontrado.</Text>
      )}
    </View>
  );
}