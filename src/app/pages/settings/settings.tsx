import { View, Text, TouchableOpacity } from 'react-native';
import Header from '~/components/headerButtons/Header/header';
import { LogOut, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import routes from '~/routes/routes';

export default function Settings() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <Header title="Ajustes" showFilter={false} showBackButton={true} />
      <View className="flex-1 items-center justify-start pt-10">
        <TouchableOpacity className="h-16 w-11/12 flex-row items-center justify-start rounded-lg shadow-md">
          <View className="h-[52px] w-[52px] items-center justify-center rounded-lg bg-inputColor">
            <LogOut color="black" size={20} />
          </View>
          <Text className="flex-1 px-3 text-lg font-bold text-black">
            Sair
          </Text>
          <View className="items-center justify-center">
            <ChevronRight color="#7C8BA0" size={20} onPress={() => router.push(routes.login)} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
