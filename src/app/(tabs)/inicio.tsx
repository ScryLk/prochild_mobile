import { Text, View } from 'react-native';
import Categories from '~/components/categories/categories';
import Section from '~/components/section/section';

export default function Home() {
  return (
    <View className='items-center w-screen justify-center'>
      <Section />
      <Categories />
    </View>
  );
}
