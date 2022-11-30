import React from 'react';
import {Text, SafeAreaView, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import PrimaryNavigator from './src/navigation/PrimaryNavigator';
import NfcManager from 'react-native-nfc-manager';

NfcManager.start().catch(e => {
  console.log(e);
});

const App = () => {
  return (
    <NavigationContainer>
      <PrimaryNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
