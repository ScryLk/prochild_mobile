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

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/healthcenters/', requestOptions);
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
        <View className="bg-gray-100 rounded-2xl p-4 mb-4 shadow-sm">
          <Text className="text-base font-semibold mb-2">Nome do Centro</Text>
          <TextInput
            className="bg-white rounded-lg border border-gray-300 px-3 py-2 mb-2"
            placeholder="Digite o nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text className="text-base font-semibold mb-2">Telefone</Text>
          <TextInput
            className="bg-white rounded-lg border border-gray-300 px-3 py-2 mb-2"
            placeholder="Digite o telefone"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text className="text-base font-semibold mb-2">Descrição</Text>
          <TextInput
            className="bg-white rounded-lg border border-gray-300 px-3 py-2 mb-2"
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
          style={loading ? { opacity: 0.6 } : {}}
        >
          <Text className="text-base font-semibold text-white">
            {loading ? 'Cadastrando...' : 'Cadastrar Centro de Saúde'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}