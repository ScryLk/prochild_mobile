import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { Link } from 'expo-router';

type Category = {
  id: string;
  nome: string;
  cor: string;
  icone_id: keyof typeof LucideIcons;
};

type Section = {
  id: string;
  nome: string;
};

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function Section() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesBySection, setCategoriesBySection] = useState<Record<string, Category[]>>({});

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          'https://prochild-back-proud-star-4651.fly.dev/sections/sections/'
        );
        const data = await response.json();
        if (data.Sucesso && Array.isArray(data.Sucesso)) {
          setSections(data.Sucesso);
        } else {
          console.error('Os dados retornados não são válidos:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar seções:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  useEffect(() => {
    const fetchCategoriesForSections = async () => {
      const categoriesMap: Record<string, Category[]> = {};
      for (const section of sections) {
        try {
          const response = await fetch(
            `https://prochild-back-proud-star-4651.fly.dev/categories/categories/sections/${section.id}`
          );
          const data = await response.json();
          if (data.success && Array.isArray(data.success)) {
            categoriesMap[section.id] = data.success;
          } else {
            categoriesMap[section.id] = [];
          }
        } catch (error) {
          console.error(`Erro ao buscar categorias para a seção ${section.id}:`, error);
          categoriesMap[section.id] = [];
        }
      }
      setCategoriesBySection(categoriesMap);
    };

    if (sections.length > 0) {
      fetchCategoriesForSections();
    }
  }, [sections]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3461FD" />
      </View>
    );
  }

  return (
    <View className="p-4">
    {sections.map((section) => (
      <View key={section.id} className="mb-6">
        <Text className="mb-4 font-inter text-[22px] font-bold">{section.nome}</Text>
        <View className="mt-4">
          {categoriesBySection[section.id] && categoriesBySection[section.id].length > 0 ? (
            chunkArray(categoriesBySection[section.id], 3).map((row, rowIdx) => (
              <View key={rowIdx} className="flex flex-row justify-between mb-4">
                {row.map((category) => {
                  const Icon = LucideIcons[category.icone_id] as React.ComponentType<{
                    color?: string;
                    size?: number;
                  }>;
                  const DefaultIcon = LucideIcons['AlertCircle'] as React.ComponentType<{
                    color?: string;
                    size?: number;
                  }>;
                  return (
                    <Link
                      key={category.id}
                      href={{
                        pathname: 'pages/trainings/[categoryId]',
                        params: { categoryId: category.id, categoryName: category.nome },
                      }}
                      className="h-[140px] w-[100px]"
                    >
                      <View className="items-center justify-center rounded-md border border-gray-300 bg-white shadow-md h-full w-full">
                        <View
                          className="h-[60px] w-[60px] items-center justify-center rounded-full"
                          style={{ backgroundColor: category.cor || '#D3D3D3' }}>
                          {Icon ? (
                            <Icon color="white" size={28} />
                          ) : (
                            <DefaultIcon color="white" size={28} />
                          )}
                        </View>
                        <Text
                          className="mt-3 text-center font-inter text-[14px] font-medium text-gray-800"
                          numberOfLines={2}>
                          {category.nome}
                        </Text>
                      </View>
                    </Link>
                  );
                })}
                {/* Preenche a linha com espaços vazios se faltar categoria */}
                {Array.from({ length: 3 - row.length }).map((_, idx) => (
                  <View key={`empty-${idx}`} className="h-[140px] w-[100px]" />
                ))}
              </View>
            ))
          ) : (
            <Text className="ml-4 font-inter text-[16px] text-gray-500">
              Nenhuma categoria disponível.
            </Text>
          )}
        </View>
      </View>
    ))}
  </View>
  );
}
