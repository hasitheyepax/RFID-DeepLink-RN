import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

export default function Scanner() {
  const [scannerActive, setScannerActive] = useState(true);

  useEffect(() => {
    const readNFC = async () => {
      readNdef();
    };

    readNFC();

    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  });

  const readNdef = async () => {
    console.log('hello');
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      console.log('manager stopped');
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      {scannerActive ? <ActivityIndicator size={40} color={'#ef959c'} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
