import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Filter } from "lucide-react-native";

interface HeaderProps {
  title: string;
  showFilter?: boolean; 
  onFilterPress?: () => void;
}

export default function Header({ title, showFilter = false, onFilterPress }: HeaderProps) {
  return (
    <View className="h-20 mb-7 bg-black justify-center items-center flex flex-row" >
      <Text className="text-white text-xl capitalize font-bold flex-1 text-center">{title}</Text>
      {showFilter && (
        <TouchableOpacity className="absolute right-16 top-16" onPress={onFilterPress}>
          <Filter color="#fff" size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
}
