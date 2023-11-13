import { View, StatusBar } from 'react-native';
import { useFonts, Exo_800ExtraBold, Exo_400Regular } from '@expo-google-fonts/exo';

import { Loading } from '@components/Loading';
import { StackNavigator } from '@routes/stack.route';
import AuthenticatedUserProvider from './src/context/AuthenticationContext';

export default function App() {
  const [loadedFonts] = useFonts({ Exo_800ExtraBold, Exo_400Regular });

  return (
    <AuthenticatedUserProvider>
      <View style={{ flex: 1, marginTop: 50, backgroundColor: 'white' }}>
        <StatusBar barStyle='default' translucent />
        {loadedFonts ? <StackNavigator /> : <Loading />}
      </View>
    </AuthenticatedUserProvider>
  );
}