import { View, StatusBar } from 'react-native';

import SingIn from './src/pages/SignIn';

export default function App() {
  return (
    <View>
      <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false} />
      <SingIn />
    </View>
  );
}
