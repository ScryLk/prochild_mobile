import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
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

        // Verifica se a resposta contém a propriedade 'success' com um array
        if (data.success && Array.isArray(data.success)) {
          setCategories(data.success); // Define o array de categorias no estado
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
            const Icon = LucideIcons[category.icone_id] as React.ComponentType; // Garante que Icon é um componente React

            return (
              <TouchableOpacity key={category.id} className="mb-4 w-[30%]">
                <View className="relative h-[118px] items-center justify-center rounded-md border border-black bg-white">
                  <View
                    className="absolute top-4 h-[52px] w-[52px] items-center justify-center rounded-full"
                    style={{ backgroundColor: category.cor }} // Atribui a cor dinâmica
                  >
                    {Icon ? <Icon /> : null}
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
