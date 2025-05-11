import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Linking, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "../../../components/headerButtons/Header/header"; // Ajuste o caminho conforme necessário
import { FileText, Video, Image as ImageIcon } from "lucide-react-native"; // Ícones para os tipos de arquivo
import { Menu } from "lucide-react-native";

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

  const getIconForFileType = (fileName: string) => {
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    switch (fileExtension) {
      case "pdf":
        return <FileText color="#000" size={24} />;
      case "mp4":
      case "mov":
      case "avi":
        return <Video color="#000" size={24} />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImageIcon color="#000" size={24} />;
      default:
        return <FileText color="#000" size={24} />;
    }
  };

  const handleMenuPress = (training: Training) => {
    Alert.alert(
      "Ação",
      `O que você gostaria de fazer com o treinamento "${training.titulo}"?`,
      [
        {
          text: "Abrir",
          onPress: () => Linking.openURL(training.arquivo_caminho),
        },
        {
          text: "Cancelar",
          style: "cancel",
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

  return (
    <View className="flex-1">
      {/* Header */}
      <Header
        title={`${categoryName}`}
        showFilter={true}
        onFilterPress={() => console.log("Filtro pressionado")}
        showBackButton={true}
      />

      {/* Conteúdo */}
      <View className="p-4">
        {trainings.length > 0 ? (
          <FlatList
            data={trainings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex-row items-center mb-4 p-4 border border-gray-300 rounded-md">
                {/* Ícone do tipo de arquivo */}
                <View className="mr-4">{getIconForFileType(item.arquivo_nome)}</View>

                {/* Informações do treinamento */}
                <View className="flex-1">
                  <Text className="text-[18px] font-bold">{item.titulo}</Text>
                  <Text className="text-[14px] text-gray-600">{item.descricao}</Text>
                </View>

                {/* Botão de menu */}
                <TouchableOpacity onPress={() => handleMenuPress(item)}>
                  <Menu />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text className="text-[16px] text-gray-500">Nenhum treinamento encontrado.</Text>
        )}
      </View>
    </View>
  );
}