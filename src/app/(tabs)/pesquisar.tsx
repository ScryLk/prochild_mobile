import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

type Category = {
  id: string;
  nome: string;
  treinamentos: Training[]; // Adicionamos os treinamentos dentro da categoria
};

type Training = {
  id: string;
  titulo: string;
  descricao: string;
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para o texto de busca
  const [categories, setCategories] = useState<{ nome: string; treinamentos: Training[] }[]>([]); // Estado para categorias com treinamentos
  const [loading, setLoading] = useState(false); // Estado para carregamento
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (categoryId: string) => {
      setLoading(true);
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
  
        const response = await fetch(`http://127.0.0.1:8000/trainings/trainings/categorie/${categoryId}`, requestOptions);
        const data = await response.json();
  
        console.log("Dados recebidos da API:", data); // Para depuração
  
        // Verifica se data.success existe e é um array
        if (data.success && Array.isArray(data.success)) {
          const groupedCategories = data.success.reduce((acc: any, training: any) => {
            const categoryName = training.categoria_nome;
  
            // Verifica se a categoria já existe no acumulador
            const existingCategory = acc.find((cat: any) => cat.nome === categoryName);
  
            if (existingCategory) {
              // Adiciona o treinamento à categoria existente
              existingCategory.treinamentos.push(training);
            } else {
              // Cria uma nova categoria com o treinamento
              acc.push({
                nome: categoryName,
                treinamentos: [training],
              });
            }
  
            return acc;
          }, []);
  
          setCategories(groupedCategories);
        } else {
          console.error("Erro: data.success não é um array ou está ausente.", data);
          setCategories([]); 
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Filtra os treinamentos dentro de cada categoria com base no texto de busca
  const filteredCategories = categories.map((category) => {
    const filteredTrainings = Array.isArray(category.treinamentos)
      ? category.treinamentos.filter((training) =>
          training.titulo.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : []; // Se `treinamentos` não for um array, retorna um array vazio

    return { ...category, treinamentos: filteredTrainings };
  });

  // Remove categorias que não possuem treinamentos correspondentes
  const categoriesWithTrainings = filteredCategories.filter((category) => category.treinamentos.length > 0);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3461FD" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      {/* Campo de busca */}
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Buscar treinamentos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Lista de categorias com treinamentos */}
      <FlatList
        data={categoriesWithTrainings}
        keyExtractor={(item) => item.nome}
        renderItem={({ item: category }) => (
          <View className="mb-4">
            {/* Nome da categoria */}
            <Text className="text-[18px] font-bold mb-2">{category.nome}</Text>

            {/* Lista de treinamentos dentro da categoria */}
            <FlatList
              data={category.treinamentos}
              keyExtractor={(training) => training.id.toString()}
              renderItem={({ item: training }) => (
                <TouchableOpacity
                  className="p-4 border border-gray-300 rounded-md mb-2"
                  onPress={() =>
                    router.push({
                      pathname: `/pages/trainings/trainingsDetails/trainingsDetails`,
                      params: { trainingId: training.id },
                    })
                  }
                >
                  <Text className="text-[16px] font-bold">{training.titulo}</Text>
                  <Text className="text-[14px] text-gray-600" numberOfLines={2} ellipsizeMode="tail">
                    {training.descricao}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        ListEmptyComponent={<Text className="text-gray-500">Nenhum treinamento encontrado.</Text>}
      />
    </View>
  );
}