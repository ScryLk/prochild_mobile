import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import GoogleIcon from '../../../assets/svg/google.svg';
import GovIcon from '../../../assets/svg/govbr.png';
import routes from '~/routes/routes';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkLogged = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.replace('/(tabs)');
      }
    };
    checkLogged();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    const raw = JSON.stringify({
      email: email,
      password: password,
    });

    try {
      const response = await fetch('https://prochild-back-proud-star-4651.fly.dev/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: raw,
      });

      const text = await response.text();
      console.log('Texto bruto da resposta:', text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error('Erro ao fazer parse do JSON:', e);
        Alert.alert('Erro', 'Resposta inválida do servidor.');
        return;
      }

      if (response.ok && (result.access || result.token)) {
        const token = result.access || result.token;
        await AsyncStorage.setItem('token', token);

        if (result.id) {
          await AsyncStorage.setItem('user_id', String(result.id));
        }

        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        router.replace('/(tabs)');
      } else {
        console.error('Erro no login:', result);
        Alert.alert('Erro', result?.message || 'Falha ao realizar login.');
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
      <View>
        <View className="mb-2">
          <Text>E-mail</Text>
        </View>
        <TextInput
          placeholder="Digite seu e-mail"
          className="mb-4 rounded-lg bg-inputColor px-4 py-4 text-black"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View>
        <View className="mb-2">
          <Text>Senha</Text>
        </View>
        <View className="mb-4 flex-row items-center rounded-lg bg-inputColor px-4 py-4">
          <TextInput
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword}
            className="flex-1 text-black"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff color="gray" size={24} /> : <Eye color="gray" size={24} />}
          </TouchableOpacity>
        </View>
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
