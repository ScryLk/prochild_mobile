import { Tabs } from "expo-router";
import { Home, Download, Search } from "lucide-react-native";
import Header from "~/components/headerButtons/Header/header";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        header: ({ route }) => <Header title={route.name} />, 
        tabBarShowLabel: false, 
        tabBarStyle: {
          height: 50,
          backgroundColor: "transparent", 
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray", 
      }}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} /> 
          ),
        }}
      />
      <Tabs.Screen
        name="pesquisar"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Search color={color} size={size} /> 
          ),
        }}
      />
       <Tabs.Screen
        name="downloads"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Download color={color} size={size} /> 
          ),
        }}
      />
    </Tabs>
  );
}