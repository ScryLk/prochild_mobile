import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Eye } from 'lucide-react-native';
import { Link } from 'expo-router';
import routes from '~/routes/routes';

export default function Register() {
  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="mb-8 text-center text-3xl font-bold text-primaryColor">Cadastro</Text>
      <View className="mb-6 flex-row justify-between"></View>

      <View className="mb-6 flex-row items-center"></View>
      <TextInput
        placeholder="Nome"
        className="mb-4 rounded-lg bg-inputColor px-4 py-4 text-black"
        keyboardType="default"
      />

      <TextInput
        placeholder="Email"
        className="mb-4 rounded-lg bg-inputColor px-4 py-4 text-black"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Telefone"
        className="mb-4 rounded-lg bg-inputColor px-4 py-4 text-black"
        keyboardType="number-pad"
      />

      <View className="mb-4 flex-row items-center rounded-lg bg-inputColor px-4 py-4">
        <TextInput placeholder="Senha" secureTextEntry className="flex-1 text-black" />
        <TouchableOpacity>
          <Eye color="gray" size={24} />
        </TouchableOpacity>
      </View>

      <View className="mb-4 flex-row items-center rounded-lg bg-inputColor px-4 py-4">
        <TextInput placeholder="Confirmar Senha" secureTextEntry className="flex-1 text-black" />
        <TouchableOpacity>
          <Eye color="gray" size={24} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="mb-6 items-center rounded-lg bg-primaryColor py-4">
        <Text className="text-lg font-bold text-white">Cadastrar</Text>
      </TouchableOpacity>
      <View className="flex flex-row justify-center">
        <Text className="text-gray-500">Já possui uma conta? </Text>
        <TouchableOpacity>
          <Link href={routes.login} className="font-bold text-primaryColor">
            Realizar Login
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
