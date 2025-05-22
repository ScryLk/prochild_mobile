import { View, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter(); 

  return (
    <TouchableOpacity onPress={() => router.back()}>
      <View className="fixed w-[48px] h-[48px] items-center justify-center rounded-lg bg-gray-200">
        <ChevronLeft color="#000" size={28} />
      </View>
    </TouchableOpacity>
  );
}