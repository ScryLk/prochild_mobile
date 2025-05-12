import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import routes from '~/routes/routes';

export default function Home() {
  return (
    <View className="flex h-full w-full items-center justify-center align-middle">
      <Text className="items-center flex justify-center text-red-500">
        <View className="w-ful  l">
          <Link href={routes.login}>Login</Link>
        </View>
        <View className='w-full'>
          <Link rel="stylesheet" href={routes.register}>
            Cadastro
          </Link>
        </View>
        <View className='w-full'>
          <Link href={routes.forgotPassword}>Esqueci minha senha</Link>
        </View>
        <View className='w-full'>
          <Link href={routes.homePage}>Inicio</Link>
        </View>
      </Text>
      <View>
          <Link href={routes.trainings}>Treinamentos</Link>
      </View>
    </View>
  );
}
