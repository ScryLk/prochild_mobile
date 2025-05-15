import { View, Text, TouchableOpacity } from "react-native";
import { Filter, ChevronLeft, Plus } from "lucide-react-native"; // Adicionado o ícone Plus
import { useRouter } from "expo-router";

interface HeaderProps {
  title: string;
  showFilter?: boolean;
  onFilterPress?: () => void;
  showBackButton?: boolean; // Prop para exibir o botão de voltar
  showPlusButton?: boolean; // Nova prop para exibir o botão de adicionar
  onPlusPress?: () => void; // Callback para o botão de adicionar
}

export default function Header({
  title,
  showFilter = false,
  onFilterPress,
  showBackButton = false,
  showPlusButton = false, // Nova prop
  onPlusPress, // Callback para o botão de adicionar
}: HeaderProps) {
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
          style={{ position: "absolute", right: showPlusButton ? 56 : 16 }} // Ajusta a posição se o botão de adicionar também estiver visível
          onPress={onFilterPress}
        >
          <Filter color="#fff" size={28} />
        </TouchableOpacity>
      )}

      {/* Botão de adicionar */}
      {showPlusButton && (
        <TouchableOpacity
          style={{ position: "absolute", right: 16 }}
          onPress={onPlusPress}
        >
          <Plus color="#fff" size={28} />
        </TouchableOpacity>
      )}
    </View>
  );
}