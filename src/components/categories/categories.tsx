import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as LucideIcons from 'lucide-react-native';

type Category = {
  id: string;
  nome: string;
  cor: string;
  icone_id: keyof typeof LucideIcons;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://prochild-back-proud-star-4651.fly.dev/categories/categories/');
        const data = await response.json();

        if (data.success && Array.isArray(data.success)) {
          setCategories(data.success);
        } else {
          console.error('Os dados retornados não são um array:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (category: Category) => {
    Alert.alert('Categoria Selecionada', `Nome: ${category.nome}\nCor: ${category.cor}`);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3461FD" />
      </View>
    );
  }

  return (
    <View className="h-full w-full bg-backgroundColor p-4">
      <View className="flex flex-row flex-wrap justify-between">
        {Array.isArray(categories) &&
          categories.map((category) => {
            const Icon = LucideIcons[category.icone_id] as React.ComponentType | undefined;
            const DefaultIcon = LucideIcons['AlertCircle'];

            console.log('Ícone ID:', category.icone_id);

            return (
              <TouchableOpacity
                key={category.id}
                className="mb-4 w-[30%]"
                onPress={() => handleCategoryPress(category)} // Atribui a ação ao pressionar
              >
                <View className="relative h-[118px] items-center justify-center rounded-md border border-black bg-white">
                  <View
                    className="absolute top-4 h-[52px] w-[52px] items-center justify-center rounded-full"
                    style={{ backgroundColor: category.cor }}>
                    {Icon ? <Icon /> : <DefaultIcon color="white" size={24} />}
                  </View>
                  <View className="absolute bottom-4 items-center">
                    <Text className="text-center font-inter">{category.nome}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}
