import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '~/components/headerButtons/Header/header';

export default function AddHealthCenters() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [descricao, setDescricao] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('user_id');
      if (id) setUserId(Number(id));
    };
    getUserId();
  }, []);

  const handleSubmit = async () => {
    if (loading) return;
    if (!nome || !telefone || !descricao || !userId) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', 'csrftoken=kIXQNyPmD8kZSIkPOTj6mWZdE2GhtKnu');

    const raw = JSON.stringify({
      nome,
      telefone,
      descricao,
      usuario_id: userId,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'https://prochild-back-proud-star-4651.fly.dev/healthcenters/',
        requestOptions
      );
      const result = await response.text();
      if (response.ok) {
        Alert.alert('Sucesso', 'Centro de saúde criado!');
        setNome('');
        setTelefone('');
        setDescricao('');
      } else {
        Alert.alert('Erro', `Falha ao cadastrar: ${result}`);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Adicionar Centro de Saúde"
        showBackButton
        showPlusButton={false}
        showFilter={false}
      />
      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
        <View className="mb-4 rounded-2xl bg-gray-100 p-4 shadow-sm">
          <Text className="mb-2 text-base font-semibold">Nome do Centro</Text>
          <TextInput
            className="mb-2 rounded-lg border border-gray-300 bg-white px-3 py-2"
            placeholder="Digite o nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text className="mb-2 text-base font-semibold">Telefone</Text>
          <TextInput
            className="mb-2 rounded-lg border border-gray-300 bg-white px-3 py-2"
            placeholder="Digite o telefone"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text className="mb-2 text-base font-semibold">Descrição</Text>
          <TextInput
            className="mb-2 rounded-lg border border-gray-300 bg-white px-3 py-2"
            placeholder="Digite uma descrição"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
            style={{ minHeight: 80, textAlignVertical: 'top' }}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="mt-4 items-center rounded-lg bg-blue-600 py-4"
          disabled={loading}
          style={loading ? { opacity: 0.6 } : {}}>
          <Text className="text-base font-semibold text-white">
            {loading ? 'Cadastrando...' : 'Cadastrar Centro de Saúde'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
