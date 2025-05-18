import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '~/components/headerButtons/Header/header';

export default function AddHealthCenters() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [descricao, setDescricao] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('user_id');
      if (id) setUserId(Number(id));
    };
    getUserId();
  }, []);

  const handleSubmit = async () => {
    if (!nome || !telefone || !descricao || !userId) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

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
    }
  };

  return (
    <View className="flex-1">
      <Header
        title="Adicionar Centro de Saúde"
        showBackButton
        showPlusButton={false}
        showFilter={false}
      />
      <View className="flex-1 bg-white p-4">
        <Text className="mt-2 text-base">Nome</Text>
        <TextInput
          className="rounded border border-gray-300 px-2 py-1"
          value={nome}
          onChangeText={setNome}
        />

        <Text className="mt-2 text-base">Telefone</Text>
        <TextInput
          className="rounded border border-gray-300 px-2 py-1"
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text className="mt-2 text-base">Descrição</Text>
        <TextInput
          className="rounded border border-gray-300 px-2 py-1"
          value={descricao}
          onChangeText={setDescricao}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          className="mt-4 items-center rounded bg-blue-500 py-3">
          <Text className="text-base font-semibold text-white">Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
