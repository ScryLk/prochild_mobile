import { View, Text } from "react-native";
import { Link } from "expo-router";
import routes from "~/routes/routes";

export default function Home(){
  return(
    <View className="items-center justify-center flex">
      <Text className="text-red-500">
       <Link href={routes.register}>Eaii</Link> 
      </Text>
    </View>
  )
}