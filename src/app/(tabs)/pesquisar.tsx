import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

type Training = {
  id: string;
  titulo: string;
  descricao: string;
  categoria_nome: string;
};

type Category = {
  nome: string;
  treinamentos: Training[];
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const requestOptions: RequestInit = {
          method: 'GET',
          redirect: 'follow',
        };

        const response = await fetch(
          'https://prochild-back-proud-star-4651.fly.dev/trainings/trainings/',
          requestOptions
        );
        const data = await response.json();

        if (data.success && Array.isArray(data.success)) {
          const groupedCategories = data.success.reduce((acc: Category[], training: Training) => {
            const categoryName = training.categoria_nome;
            let category = acc.find((cat) => cat.nome === categoryName);
            if (!category) {
              category = { nome: categoryName, treinamentos: [] };
              acc.push(category);
            }
            category.treinamentos.push(training);
            return acc;
          }, []);
          setCategories(groupedCategories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCategories = categories
    .map((category) => {
      const filteredTrainings = category.treinamentos.filter((training) =>
        training.titulo.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...category, treinamentos: filteredTrainings };
    })
    .filter((category) => category.treinamentos.length > 0);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3461FD" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <TextInput
        className="mb-4 rounded-md border border-gray-300 p-2"
        placeholder="Buscar treinamentos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.nome}
        renderItem={({ item: category }) => (
          <View className="mb-4">
            <Text className="mb-2 text-[18px] font-bold">{category.nome}</Text>
            <FlatList
              data={category.treinamentos}
              keyExtractor={(training) => training.id.toString()}
              renderItem={({ item: training }) => (
                <TouchableOpacity
                  className="mb-2 rounded-md border border-gray-300 p-4"
                  onPress={() =>
                    router.push({
                      pathname: `/pages/trainings/trainingsDetails/trainingsDetails`,
                      params: { trainingId: training.id },
                    })
                  }>
                  <Text className="text-[16px] font-bold">{training.titulo}</Text>
                  <Text
                    className="text-[14px] text-gray-600"
                    numberOfLines={2}
                    ellipsizeMode="tail">
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
