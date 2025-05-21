import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "../../../../components/headerButtons/Header/header";
import { File, Calendar, RefreshCw } from "lucide-react-native"; // Importação dos ícones

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
        const response = await fetch(`https://prochild-back-proud-star-4651.fly.dev/trainings/trainings/${trainingId}`);
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
    <View className="flex-1 bg-gray-100">
      {/* Header com o título do treinamento */}
      <Header
        title={training.titulo} // Define o título do treinamento no Header
        showBackButton={true}
      />

      {/* Conteúdo */}
      <ScrollView className="p-4">
        <View className="bg-white rounded-lg shadow-md p-4 mb-4">
          <Text className="text-[20px] font-bold mb-2 text-gray-800">{training.titulo}</Text>
          <Text className="text-[14px] text-gray-600 mb-4">{training.descricao}</Text>

          {/* Link para o arquivo */}
          <TouchableOpacity
            onPress={() => Linking.openURL(training.arquivo_caminho)}
            className="flex-row items-center mb-4"
          >
            <File size={18} color="#3461FD" />
            <Text className="text-[14px] text-blue-500 underline ml-2">
              Baixar arquivo: {training.arquivo_nome}
            </Text>
          </TouchableOpacity>

          {/* Datas */}
          <View className="flex-row items-center mb-2">
            <Calendar size={18} color="#6B7280" />
            <Text className="text-[14px] text-gray-500 ml-2">
              Criado em: {new Date(training.created_at).toLocaleDateString()}
            </Text>
          </View>
          <View className="flex-row items-center">
            <RefreshCw size={18} color="#6B7280" />
            <Text className="text-[14px] text-gray-500 ml-2">
              Atualizado em: {new Date(training.updated_at).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}