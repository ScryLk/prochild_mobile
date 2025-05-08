import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Categories() {
  return (
    <View className="bg-backgroundColor h-full w-full p-4">
      <View className="flex flex-row flex-wrap justify-between">
        <TouchableOpacity className="mb-4 w-[30%]">
          <View className="h-[118px] items-center justify-center rounded-md border border-black bg-white relative">
            <View className="absolute top-4 h-[52px] w-[52px] items-center justify-center rounded-full bg-blue-600">
              <Text className="text-white">Ola</Text>
            </View>
            <View className="absolute bottom-4 items-center">
              <Text className="text-center font-inter">Cuidados Físicos</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="mb-4 w-[30%]">
          <View className="h-[118px] items-center justify-center rounded-md border border-black bg-white relative">
            <View className="absolute top-4 h-[52px] w-[52px] items-center justify-center rounded-full bg-green-600">
              <Text className="text-white">Ola</Text>
            </View>
            <View className="absolute bottom-4 items-center">
              <Text className="text-center font-inter">Prevenção</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="mb-4 w-[30%]">
          <View className="h-[118px] items-center justify-center rounded-md border border-black bg-white relative">
            <View className="absolute top-4 h-[52px] w-[52px] items-center justify-center rounded-full bg-red-600">
              <Text className="text-white">Ola</Text>
            </View>
            <View className="absolute bottom-4 items-center">
              <Text className="text-center font-inter">Cuidados Mentais</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}