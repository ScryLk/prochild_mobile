import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "../../../../components/headerButtons/Header/header";

type TrainingDetails = {
  id: string;
  titulo: string;
  descricao: string;
  arquivo_nome: string;
  arquivo_caminho: string;
  tamanho: string | null;
  categoria_id: number;
  secao_id: number;
  created_at: string;
  updated_at: string;
};

export default function TrainingDetails() {
  const { trainingId } = useLocalSearchParams(); // Obtém o ID do treinamento da URL
  const [training, setTraining] = useState<TrainingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/trainings/trainings/${trainingId}`);
        const data = await response.json();
        console.log("Dados do treinamento:", data); // Verifica o retorno da API
        setTraining(data.success); // Atualiza o estado com os detalhes do treinamento
      } catch (error) {
        console.error("Erro ao buscar detalhes do treinamento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingDetails();
  }, [trainingId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3461FD" />
      </View>
    );
  }

  if (!training) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-[16px] text-gray-500">Detalhes do treinamento não encontrados.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Header com o título do treinamento */}
      <Header
        title={training.titulo} // Define o título do treinamento no Header
        showBackButton={true}
      />

      {/* Conteúdo */}
      <ScrollView className="p-4">
        <Text className="text-[18px] font-bold mb-2">{training.titulo}</Text>
        <Text className="text-[14px] text-gray-600 mb-4">{training.descricao}</Text>
        <Text className="text-[14px] text-blue-500 underline">
          Arquivo: {training.arquivo_nome}
        </Text>
        <Text className="text-[14px] text-gray-500">
          Criado em: {new Date(training.created_at).toLocaleDateString()}
        </Text>
        <Text className="text-[14px] text-gray-500">
          Atualizado em: {new Date(training.updated_at).toLocaleDateString()}
        </Text>
      </ScrollView>
    </View>
  );
}