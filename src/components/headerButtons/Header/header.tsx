import { View, Text, TouchableOpacity } from 'react-native';
import { Filter, ChevronLeft, Plus } from 'lucide-react-native';
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
    <View className="relative flex h-24 flex-row items-center px-4">
      {showBackButton && (
        <TouchableOpacity
          className="fixed w-[48px] h-[48px] items-center justify-center rounded-lg bg-gray-200"
          onPress={() => {
            try {
              router.back();
            } catch (error) {
              console.warn('Erro ao tentar voltar:', error);
            }
          }}>
          <ChevronLeft color="#000" size={28} />
        </TouchableOpacity>
      )}

      <Text className="flex-1 text-center text-2xl font-bold capitalize text-black  ">{title}</Text>

      {showFilter && (
        <TouchableOpacity
          className="fixed w-[48px] h-[48px] items-center justify-center rounded-lg bg-gray-200"
          onPress={onFilterPress}>
          <Filter color="#000" size={28} />
        </TouchableOpacity>
      )}

      {showPlusButton && (
        <TouchableOpacity
          className="fixed w-[48px] h-[48px] items-center justify-center rounded-lg bg-gray-200"
          onPress={() => {
            if (plusButtonRoute) {
              router.push(plusButtonRoute);
            } else if (onPlusPress) {
              onPlusPress();
            }
          }}>
          <Plus color="#000" size={28} />
        </TouchableOpacity>
      )}
    </View>
  );
}
