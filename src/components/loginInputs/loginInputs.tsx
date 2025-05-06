import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

interface InputProps {
  placeholder: string;
  isPassword?: boolean; // Define se o input é de senha
  keyboardType?: 'default' | 'email-address'; // Tipo de teclado
}

export default function Input({ placeholder, isPassword = false, keyboardType = 'default' }: InputProps) {
  const [isSecure, setIsSecure] = useState(isPassword); // Controla a visibilidade da senha

  return (
    <View className={`mb-4 ${isPassword ? 'flex-row items-center' : ''} rounded-lg bg-inputColor px-4 py-4`}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isSecure} // Define se o texto será oculto
        keyboardType={keyboardType}
        className="flex-1 text-black"
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
          <Text className="text-gray-500">{isSecure ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}