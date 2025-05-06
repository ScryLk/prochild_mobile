import { View, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter(); // Usa o hook useRouter para navegação

  return (
    <TouchableOpacity onPress={() => router.back()}>
      <View className="h-10 w-10 items-center justify-center rounded-md bg-white border-2 border-primaryColor">
        <ChevronLeft color="#3461FD" size={24} />
      </View>
    </TouchableOpacity>
  );
}