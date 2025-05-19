import { View, Text, TouchableOpacity } from 'react-native';
import Header from '~/components/headerButtons/Header/header';

export default function Settings() {
  return (
    <View className="flex-1 bg-white">
      <Header
        title="Ajustes"
        showFilter={false}
        showBackButton={true}
      />
      <View className="flex-1 items-center justify-start pt-10">
        <TouchableOpacity className="h-16 w-11/12 flex-row items-center justify-start rounded-lg bg-black shadow-md">
          <View className="flex flex-row items-center w-full px-3">
            <Text className="text-white text-lg font-bold flex-1">Olá</Text>
            <View className="h-8 w-8 bg-white rounded" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}