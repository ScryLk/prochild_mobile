import { Text, View } from 'react-native';
import Header from '~/components/headerButtons/Header/header';

export default function EmergencyCalls() {
  return (
    <View>
      <Header
        title={'Disque Emergência'}
        showFilter={false}
        onFilterPress={() => console.log('Filtro pressionado')}
        showBackButton={true}
      />
    </View>
  );
}
