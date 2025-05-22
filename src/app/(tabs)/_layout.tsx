import { Tabs } from "expo-router";
import { Home, Download, Search } from "lucide-react-native";
import Header from "~/components/headerButtons/Header/header";


const getHeaderTitle = (routeName: string) => {
  switch (routeName) {
    case "index":
      return "Inicio";
    case "pesquisar":
      return "Pesquisar";
    case "downloads":
      return "Downloads";
    default:
      return routeName;
  }
};

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        header: ({ route }) => <Header title={getHeaderTitle(route.name)} />,
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
        name="index"
        options={{
          title:"Inicio",
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