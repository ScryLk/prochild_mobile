import { ScrollView, View } from "react-native";
import Categories from "~/components/categories/categories";
import FeaturesSection from "~/components/section/features-section";
import Section from "~/components/section/section";

export default function Home() {
  return (
    <ScrollView className="w-screen">
      <View className="p-4">
        <Section />
        <FeaturesSection />
      </View>
    </ScrollView>
  );
}