import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Eye } from 'lucide-react-native';
import GoogleIcon from '../../assets/svg/google.svg'; // Certifique-se de que o caminho está correto
import GovIcon from '../../assets/svg/govbr.png'; // Ajuste o caminho para o PNG

export default function Register() {
  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="mb-8 text-center text-3xl font-bold text-primaryColor">Login</Text>
      <View className="mb-6 flex-row justify-between">
        <TouchableOpacity className="mr-2 flex-1 items-center rounded-lg bg-inputColor py-4">
          <View className="flex h-auto w-auto flex-row">
            <Image source={GovIcon} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="ml-2 flex-1 flex-row items-center justify-center gap-3 rounded-lg bg-inputColor py-4">
          <GoogleIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View className="mb-6 flex-row items-center">
        <View className="h-[1px] flex-1 bg-gray-300" />
        <Text className="mx-4 text-gray-500">Ou</Text>
        <View className="h-[1px] flex-1 bg-gray-300" />
      </View>
      <TextInput
        placeholder="lucaskepler@gmail.com"
        className="mb-4 rounded-lg bg-inputColor px-4 py-4 text-black"
        keyboardType="email-address"
      />
      <View className="mb-4 flex-row items-center rounded-lg bg-inputColor px-4 py-4">
        <TextInput placeholder="••••••••" secureTextEntry className="flex-1 text-black" />
        <TouchableOpacity>
          <Eye color="gray" size={24} /> {/* Ícone de visibilidade da senha */}
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="mb-6">
        <Text className="text-right text-gray-500">Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity className="mb-6 items-center rounded-lg bg-primaryColor py-4">
        <Text className="text-lg font-bold text-white">Login</Text>
      </TouchableOpacity>
      <Text className="text-center text-gray-500">
        Não tem uma conta? <Text className="font-bold text-primaryColor">Crie uma conta!</Text>
      </Text>
    </View>
  );
}
