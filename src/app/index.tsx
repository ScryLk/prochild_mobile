import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Home(){
  return(
    <View className="items-center justify-center flex">
      <Text className="text-red-500">
       <Link href={"new"}>Fala Galera</Link> 
      </Text>
    </View>
  )
}