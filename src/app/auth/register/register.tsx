import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Link } from 'expo-router';
import routes from '~/routes/routes';
import { useRouter } from 'expo-router'; // Importa o useRouter


export default function Register() {
  const [nome, setNome] = useState(''); // Estado para o nome
  const [email, setEmail] = useState(''); // Estado para o e-mail
  const [password, setPassword] = useState(''); // Estado para a senha
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar senha
  const [loading, setLoading] = useState(false); // Estado para carregamento
  const [showPassword, setShowPassword] = useState(false); // Estado para visibilidade da senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para visibilidade da confirmação de senha

  const router = useRouter(); // Inicializa o roteador
  

  const handleRegister = async () => {
    if (!nome || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      nome: nome,
      email: email,
      password: password,
      role: 'admin', // Ajuste conforme necessário
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch('https://prochild-back-proud-star-4651.fly.dev/users/register/', requestOptions);
      const result = await response.json();

      console.log('Resposta do servidor:', result);

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        // Redireciona para a tela de login
        router.push(routes.login); // Redireciona para a rota home
      } else {
        Alert.alert('Erro', result.message || 'Falha ao realizar o cadastro.');
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
      <Text className="mb-8 text-center text-3xl font-bold text-primaryColor">Cadastro</Text>

      <TextInput
        placeholder="Nome"
        className="mb-4 rounded-lg bg-inputColor px-4 py-4 text-black"
        keyboardType="default"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        className="mb-4 rounded-lg bg-inputColor px-4 py-4 text-black"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <View className="mb-4 flex-row items-center rounded-lg bg-inputColor px-4 py-4">
        <TextInput
          placeholder="Senha"
          secureTextEntry={!showPassword}
          className="flex-1 text-black"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeOff color="gray" size={24} />
          ) : (
            <Eye color="gray" size={24} />
          )}
        </TouchableOpacity>
      </View>

      <View className="mb-4 flex-row items-center rounded-lg bg-inputColor px-4 py-4">
        <TextInput
          placeholder="Confirmar Senha"
          secureTextEntry={!showConfirmPassword}
          className="flex-1 text-black"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? (
            <EyeOff color="gray" size={24} />
          ) : (
            <Eye color="gray" size={24} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="mb-6 items-center rounded-lg bg-primaryColor py-4"
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-lg font-bold text-white">Cadastrar</Text>
        )}
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