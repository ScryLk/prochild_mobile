import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Cross, Siren, Settings } from "lucide-react-native";
import { Link } from "expo-router";
import routes from "~/routes/routes";

export default function FeaturesSection() {
  return (
    <View className="p-4 bg-gray-100">
      <Text className="text-[22px] font-bold font-inter mb-4 text-gray-800">Funcionalidades</Text>
      <View className="flex flex-row flex-wrap justify-between">
        <Link href={routes.HealthCenter} asChild>
          <TouchableOpacity
            className="mb-4 h-[140px] w-[100px] items-center justify-center rounded-md border border-gray-300 bg-white shadow-md"
          >
            <View
              className="h-[60px] w-[60px] items-center justify-center rounded-full bg-[#6359E7]"
            >
              <Cross color={"white"} />
            </View>
            <Text className="mt-3 text-center font-inter text-[14px] font-medium text-gray-800">
              Centros de Saúde
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href="/emergency-call" asChild>
          <TouchableOpacity
            className="mb-4 h-[140px] w-[100px] items-center justify-center rounded-md border border-gray-300 bg-white shadow-md"
          >
            <View
              className="h-[60px] w-[60px] items-center justify-center rounded-full bg-[#FB7E36]"
            >
              <Siren color={"white"} />
            </View>
            <Text className="mt-3 text-center font-inter text-[14px] font-medium text-gray-800">
              Disque Emergência
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href="/settings" asChild>
          <TouchableOpacity
            className="mb-4 h-[140px] w-[100px] items-center justify-center rounded-md border border-gray-300 bg-white shadow-md"
          >
            <View
              className="h-[60px] w-[60px] items-center justify-center rounded-full bg-[#323232]"
            >
              <Settings color={"white"} />
            </View>
            <Text className="mt-3 text-center font-inter text-[14px] text-gray-800">
              Ajustes
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}