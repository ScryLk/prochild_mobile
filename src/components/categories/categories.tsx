import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Categories() {
  return (
    <View className="bg-backgroundColor h-full w-full">
      <View className='w-2/6 flex-wrap flex-row items-center justify-center'>
        <TouchableOpacity>
          <View className="h-[118px] w-[104px] items-center justify-center rounded-md border border-black bg-white">
            <View className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-blue-600">
              <Text className="text-white">Ola</Text>
            </View>
            <View className="mt-5 flex items-center justify-center ">
              <Text className="text-center">Cuidados Físicos</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
