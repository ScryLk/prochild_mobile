import { View, Text, TouchableOpacity } from 'react-native';
import Header from '~/components/headerButtons/Header/header';
import { LogOut, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import routes from '~/routes/routes';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Adicione esta linha

export default function Settings() {
  const router = useRouter();

  // Função para sair
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user_id');
    router.replace(routes.login);
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Ajustes" showFilter={false} showBackButton={true} />
      <View className="flex-1 items-center justify-start pt-10">
        <TouchableOpacity
          className="h-16 w-11/12 flex-row items-center justify-start rounded-lg shadow-md"
          onPress={handleLogout} // Adicione o onPress aqui
        >
          <View className="h-[52px] w-[52px] items-center justify-center rounded-lg bg-inputColor">
            <LogOut color="black" size={20} />
          </View>
          <Text className="flex-1 px-3 text-lg font-bold text-black">
            Sair
          </Text>
          <View className="items-center justify-center">
            <ChevronRight color="#7C8BA0" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}