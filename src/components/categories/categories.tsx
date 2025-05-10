import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as LucideIcons from 'lucide-react-native'; // Importa todos os ícones do Lucide

type Category = {
  id: string;
  nome: string;
  cor: string;
  icone_id: keyof typeof LucideIcons; // Garante que icone_id seja uma chave válida
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]); // Inicializa como array vazio
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/categories/categories/');
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
            // Verifica se o ícone existe, caso contrário, usa um ícone padrão
            const Icon = LucideIcons[category.icone_id] as React.ComponentType | undefined;
            const DefaultIcon = LucideIcons["AlertCircle"]; // Ícone padrão

            console.log("Ícone ID:", category.icone_id); // Log para verificar o ícone

            return (
              <TouchableOpacity
                key={category.id}
                className="mb-4 w-[30%]"
                onPress={() => handleCategoryPress(category)} // Atribui a ação ao pressionar
              >
                <View className="relative h-[118px] items-center justify-center rounded-md border border-black bg-white">
                  <View
                    className="absolute top-4 h-[52px] w-[52px] items-center justify-center rounded-full"
                    style={{ backgroundColor: category.cor }}
                  >
                    {Icon ? <Icon  /> : <DefaultIcon color="white" size={24} />}
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