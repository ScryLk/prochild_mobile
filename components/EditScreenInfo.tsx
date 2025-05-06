import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import Home from '~/app';

export const EditScreenInfo = ({ path }: { path: string }) => {

  return (
    <View className='flex items-center justify-center'>
      <Text className='text-red-500'><Link href={"/home"}>Ola</Link></Text>
    </View>
  );
};

