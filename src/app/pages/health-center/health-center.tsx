import { Text, View } from 'react-native';
import Header from '~/components/headerButtons/Header/header';

export default function HealthCenter() {
  return (
    <View>
      <Header
        title={"Centros de Saúde"}
        showFilter={false}
        onFilterPress={() => console.log('Filtro pressionado')}
        showBackButton={true}
        showPlusButton={true}
      />
    </View>
  );
}
