import { View, Text } from 'react-native';
import Header from '~/components/headerButtons/Header/header';

export default function Settings() {
  return (
    <View>
      <Header
        title={'Ajustes'}
        showFilter={false}
        onFilterPress={() => console.log('Filtro pressionado')}
        showBackButton={true}
      />
    </View>
  );
}
