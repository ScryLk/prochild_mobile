import { ScrollView, View, ActivityIndicator } from "react-native";
import FeaturesSection from "~/components/section/features-section";
import Section from "~/components/section/section";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
   const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/auth/login/login");
      }
      setChecking(false);
    };
    checkLogin();
  }, []);

    if (checking) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3461FD" />
      </View>
    );
  }

  return (
    <ScrollView className="w-screen">
      <View className="p-4">
        <Section />
        <FeaturesSection />
      </View>
    </ScrollView>
  );
}