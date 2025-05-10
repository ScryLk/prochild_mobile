import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as LucideIcons from "lucide-react-native";
import { Link } from "expo-router";

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

export default function Section() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesBySection, setCategoriesBySection] = useState<Record<string, Category[]>>({});

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/sections/sections/");
        const data = await response.json();
        if (data.Sucesso && Array.isArray(data.Sucesso)) {
          setSections(data.Sucesso);
        } else {
          console.error("Os dados retornados não são válidos:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar seções:", error);
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
          const response = await fetch(`http://127.0.0.1:8000/categories/categories/sections/${section.id}`);
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
          {/* Nome da seção */}
          <Text className="text-[22px] font-bold font-inter mb-4">{section.nome}</Text>
          {/* Renderiza apenas os cards */}
          <View className="flex flex-row flex-wrap justify-between mt-4">
            {categoriesBySection[section.id] && categoriesBySection[section.id].length > 0 ? (
              categoriesBySection[section.id].map((category) => {
                const Icon = LucideIcons[category.icone_id] as React.ComponentType | undefined;
                const DefaultIcon = LucideIcons["AlertCircle"]; // Ícone padrão

                return (
                  <Link
                    key={category.id}
                    href={{
                      pathname: "pages/trainings/[categoryId]",
                      params: { categoryId: category.id, categoryName: category.nome },
                    }}
                    className="mb-4 w-[30%]"
                  >
                    <View className="relative h-[118px] items-center justify-center rounded-md border border-black bg-white">
                      {/* Círculo com cor dinâmica */}
                      <View
                        className="absolute top-4 h-[52px] w-[52px] items-center justify-center rounded-full"
                        style={{ backgroundColor: category.cor || "#D3D3D3" }} // Aplica a cor ou uma cor padrão
                      >
                        {Icon ? <Icon color="white" size={24} /> : <DefaultIcon color="white" size={24} />}
                      </View>
                      {/* Nome da categoria */}
                      <View className="absolute bottom-4 items-center">
                        <Text className="text-center font-inter">{category.nome}</Text>
                      </View>
                    </View>
                  </Link>
                );
              })
            ) : (
              <Text className="text-[16px] font-inter ml-4 text-gray-500">Nenhuma categoria disponível.</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}