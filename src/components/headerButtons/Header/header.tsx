import { View, Text, TouchableOpacity } from "react-native";
import { Filter, ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

interface HeaderProps {
  title: string;
  showFilter?: boolean;
  onFilterPress?: () => void;
  showBackButton?: boolean; // Nova prop para exibir o botão de voltar
}

export default function Header({ title, showFilter = false, onFilterPress, showBackButton = false }: HeaderProps) {
  const router = useRouter(); // Hook do Expo Router para navegação

  return (
    <View className="h-24 bg-black flex flex-row items-center px-4 relative">
      {/* Botão de voltar */}
      {showBackButton && (
        <TouchableOpacity
          className="fixed"
          onPress={() => {
            try {
              router.back(); // Volta para a página anterior
            } catch (error) {
              console.warn("Erro ao tentar voltar:", error);
            }
          }}
        >
          <ChevronLeft color="#fff" size={28} />
        </TouchableOpacity>
      )}

      {/* Título centralizado */}
      <Text className="text-white capitalize text-2xl font-bold flex-1 text-center">{title}</Text>

      {/* Botão de filtro */}
      {showFilter && (
        <TouchableOpacity
          style={{ position: "absolute", right: 16 }}
          onPress={onFilterPress}
        >
          <Filter color="#fff" size={28} />
        </TouchableOpacity>
      )}
    </View>
  );
}