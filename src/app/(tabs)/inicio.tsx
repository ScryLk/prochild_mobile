import { Text, View } from 'react-native';
import Categories from '~/components/categories/categories';

export default function Home() {
  return (
    <View className='items-center w-screen justify-center'>
      <Categories />
    </View>
  );
}
