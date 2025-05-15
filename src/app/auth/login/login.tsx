import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native'; // Adicione o ícone EyeOff para alternar
import GoogleIcon from '../../../assets/svg/google.svg';
import GovIcon from '../../../assets/svg/govbr.png';
import routes from '~/routes/routes';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router'; // Importa o useRouter


export default function Login() {
  const [email, setEmail] = useState(''); // Estado para o e-mail
  const [password, setPassword] = useState(''); // Estado para a senha
  const [loading, setLoading] = useState(false); // Estado para carregamento
  const [showPassword, setShowPassword] = useState(false); // Estado para visibilidade da senha

  const router = useRouter(); // Inicializa o roteador

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    setLoading(true);
  
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
  
    const raw = JSON.stringify({
      email: email,
      password: password, // Certifique-se de usar o campo correto
    });
  
    console.log("Dados enviados:", raw); // Verifique os dados enviados
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/users/login/', requestOptions);
      const result = await response.json();
  
      console.log("Resposta do servidor:", result); // Verifique a resposta do servidor
  
      if (response.ok) {
        console.log('Login bem-sucedido:', result);
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        router.push(routes.homePage); // Redireciona para a rota home
      } else {
        console.error('Erro no login:', result);
        Alert.alert('Erro', result.message || 'Falha ao realizar login.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="mb-8 text-center text-3xl font-bold text-primaryColor">Login</Text>
      <View className="mb-6 flex-row justify-between">
        <TouchableOpacity className="mr-2 flex-1 items-center rounded-lg bg-inputColor py-2">
          <Image source={GovIcon} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
        </TouchableOpacity>
        <TouchableOpacity className="ml-2 flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-inputColor py-2">
          <GoogleIcon width={25} height={25} />
        </TouchableOpacity>
      </View>

      <View className="mb-6 flex-row items-center">
        <View className="h-[1px] flex-1 bg-gray-300" />
        <Text className="mx-4 text-gray-500">Ou</Text>
        <View className="h-[1px] flex-1 bg-gray-300" />
      </View>

      <TextInput
        placeholder="Digite seu e-mail"
        className="mb-4 rounded-lg bg-inputColor px-4 py-4 text-black"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <View className="mb-4 flex-row items-center rounded-lg bg-inputColor px-4 py-4">
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword} // Alterna entre mostrar e ocultar a senha
          className="flex-1 text-black"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeOff color="gray" size={24} /> // Ícone para ocultar a senha
          ) : (
            <Eye color="gray" size={24} /> // Ícone para mostrar a senha
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="mb-6">
        <Link href={routes.forgotPassword} className="text-right text-gray-500 underline">
          Esqueceu sua senha?
        </Link>
      </TouchableOpacity>

      <TouchableOpacity
        className="mb-6 items-center rounded-lg bg-primaryColor py-4"
        onPress={handleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-lg font-bold text-white">Login</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-500">Não tem uma conta? </Text>
        <TouchableOpacity>
          <Link href={routes.register} className="font-bold text-primaryColor">
            Criar conta
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}