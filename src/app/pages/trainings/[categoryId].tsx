import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "../../../components/headerButtons/Header/header"; // Ajuste o caminho conforme necessário
import { FileText, Video, Image as ImageIcon, Menu } from "lucide-react-native"; // Ícones para os tipos de arquivo
import routes from "~/routes/routes";

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
  const router = useRouter(); // Hook para navegação

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(`https://prochild-back-proud-star-4651.fly.dev/trainings/trainings/categorie/${categoryId}`);
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
                  <Text
                    className="text-[14px] text-gray-600"
                    numberOfLines={3} // Limita a descrição a 3 linhas
                    ellipsizeMode="tail" // Adiciona reticências no final, se necessário
                  >
                    {item.descricao}
                  </Text>
                </View>

                {/* Botão de menu como link */}
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: routes.TrainingDetails, // Redireciona para a rota de detalhes do treinamento
                      params: { trainingId: item.id }, // Passa o ID do treinamento como parâmetro
                    })
                  }
                >
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