import { View, Text, TextInput, TouchableOpacity } from "react-native";
import BackButton from "~/components/headerButtons/BackButton/backButton";

export default function ForgotPassword() {
  return (
    <View className="flex-1 bg-white px-6 ">
      <BackButton />
      <View className="w-full mt-safe-or-64">
        <Text className="mb-8 text-center text-3xl font-bold text-primaryColor">
          Recuperar Senha
        </Text>

        <TextInput
          placeholder="Email"
          className="mb-4 rounded-lg bg-inputColor px-4 py-4 text-black"
          keyboardType="email-address"
        />

        <TouchableOpacity className="mb-6 items-center rounded-lg bg-primaryColor py-4">
          <Text className="text-lg font-bold text-white">Recuperar Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}