import { View, Text, TouchableOpacity } from 'react-native';
import { Filter, ChevronLeft, Plus } from 'lucide-react-native'; // Adicionado o ícone Plus
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showFilter?: boolean;
  onFilterPress?: () => void;
  showBackButton?: boolean;
  showPlusButton?: boolean;
  onPlusPress?: () => void;
  plusButtonRoute?: string; // <-- nova prop
}

export default function Header({
  title,
  showFilter = false,
  onFilterPress,
  showBackButton = false,
  showPlusButton = false, // Nova prop
  onPlusPress, // Callback para o botão de adicionar
  plusButtonRoute, // <-- adicione aqui!
}: HeaderProps) {
  const router = useRouter(); // Hook do Expo Router para navegação

  return (
    <View className="relative flex h-24 flex-row items-center bg-black px-4">
      {/* Botão de voltar */}
      {showBackButton && (
        <TouchableOpacity
          className="fixed"
          onPress={() => {
            try {
              router.back(); // Volta para a página anterior
            } catch (error) {
              console.warn('Erro ao tentar voltar:', error);
            }
          }}>
          <ChevronLeft color="#fff" size={28} />
        </TouchableOpacity>
      )}

      {/* Título centralizado */}
      <Text className="flex-1 text-center text-2xl font-bold capitalize text-white">{title}</Text>

      {/* Botão de filtro */}
      {showFilter && (
        <TouchableOpacity
          style={{ position: 'absolute', right: showPlusButton ? 56 : 16 }} // Ajusta a posição se o botão de adicionar também estiver visível
          onPress={onFilterPress}>
          <Filter color="#fff" size={28} />
        </TouchableOpacity>
      )}

      {/* Botão de adicionar */}
      {showPlusButton && (
        <TouchableOpacity
          style={{ position: 'absolute', right: 16 }}
          onPress={() => {
            if (plusButtonRoute) {
              router.push(plusButtonRoute);
            } else if (onPlusPress) {
              onPlusPress();
            }
          }}>
          <Plus color="#fff" size={28} />
        </TouchableOpacity>
      )}
    </View>
  );
}
