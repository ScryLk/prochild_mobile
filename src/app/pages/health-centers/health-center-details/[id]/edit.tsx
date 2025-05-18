import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '~/components/headerButtons/Header/header';

export default function EditHealthCenter() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Carrega dados atuais
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Cookie', 'csrftoken=kIXQNyPmD8kZSIkPOTj6mWZdE2GhtKnu');
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      try {
        const response = await fetch(`http://127.0.0.1:8000/healthcenters/${id}`, requestOptions);
        const result = await response.json();
        const data = result['Centro de Saúde'];
        setNome(data.nome || '');
        setTelefone(data.telefone || '');
        setDescricao(data.descricao || '');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  // Função para salvar edição
  const handleSave = async () => {
    if (saving) return;
    if (!nome || !telefone) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }
    setSaving(true);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', 'csrftoken=kIXQNyPmD8kZSIkPOTj6mWZdE2GhtKnu');

    const raw = JSON.stringify({
      nome,
      telefone,
      descricao,
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/healthcenters/edit/${id}/`, requestOptions);
      const result = await response.text();
      if (response.ok) {
        Alert.alert('Sucesso', 'Centro de saúde atualizado!');
        router.back();
      } else {
        Alert.alert('Erro', `Falha ao atualizar: ${result}`);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3461FD" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Editar Centro de Saúde"
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
          onPress={handleSave}
          className="mt-4 items-center rounded-lg bg-blue-600 py-4"
          disabled={saving}
          style={saving ? { opacity: 0.6 } : {}}
        >
          <Text className="text-base font-semibold text-white">
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}