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
  plusButtonRoute?: string; 
}

export default function Header({
  title,
  showFilter = false,
  onFilterPress,
  showBackButton = false,
  showPlusButton = false, 
  onPlusPress, 
  plusButtonRoute, 
}: HeaderProps) {
  const router = useRouter(); 

  return (
    <View className="relative flex h-24 flex-row items-center bg-black px-4">
      {showBackButton && (
        <TouchableOpacity
          className="fixed"
          onPress={() => {
            try {
              router.back();
            } catch (error) {
              console.warn('Erro ao tentar voltar:', error);
            }
          }}>
          <ChevronLeft color="#fff" size={28} />
        </TouchableOpacity>
      )}

      <Text className="flex-1 text-center text-2xl font-bold capitalize text-white">{title}</Text>

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
