import { View, Text, TextInput, TouchableOpacity } from "react-native";


export default function Register() {
  return (
    <View className="flex-1 bg-white px-6 justify-center">
      {/* Título */}
      <Text className="text-primaryColor text-3xl font-bold text-center mb-8">
        Login
      </Text>

      {/* Botões de login Gov.br e Google */}
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity className="flex-1 bg-inputColor py-4 rounded-lg mr-2 items-center">
          <Text className="text-black font-medium">Gov.br</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-inputColor py-4 rounded-lg ml-2 items-center">
          <Text className="text-black font-medium">Google</Text>
        </TouchableOpacity>
      </View>

      {/* Separador */}
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="mx-4 text-gray-500">Ou</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      {/* Campo de e-mail */}
      <TextInput
        placeholder="lucaskepler@gmail.com"
        className="bg-inputColor py-4 px-4 rounded-lg mb-4 text-black"
        keyboardType="email-address"
      />

      {/* Campo de senha */}
      <View className="flex-row items-center bg-inputColor py-4 px-4 rounded-lg mb-4">
        <TextInput
          placeholder="••••••••"
          secureTextEntry
          className="flex-1 text-black"
        />
        <TouchableOpacity>
          <Text className="text-gray-500">👁️</Text>
        </TouchableOpacity>
      </View>

      {/* Esqueceu a senha */}
      <TouchableOpacity className="mb-6">
        <Text className="text-gray-500 text-right">Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Botão de login */}
      <TouchableOpacity className="bg-primaryColor py-4 rounded-lg items-center mb-6">
        <Text className="text-white font-bold text-lg">Login</Text>
      </TouchableOpacity>

      {/* Link para criar conta */}
      <Text className="text-center text-gray-500">
        Não tem uma conta?{" "}
        <Text className="text-primaryColor font-bold">Crie uma conta!</Text>
      </Text>
    </View>
  );
}