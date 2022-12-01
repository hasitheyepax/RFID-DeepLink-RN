import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {useEffect, useState} from 'react';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

export default function Scanner() {
  const [scannerActive, setScannerActive] = useState(true);
  const [scannedText, setScannedText] = useState('');

  useEffect(() => {
    const readNFC = async () => {
      readNdef();
      setScannerActive(true);
    };

    readNFC();

    return async () => {
      await NfcManager.cancelTechnologyRequest();
    };
  }, []);

  const handleRetry = async () => {
    setScannedText('');
    readNdef();
    setScannerActive(true);
  };

  const verifyToken = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzRjNjc2ZGJkY2ZlOTU3Y2U1NzJjZiIsImlhdCI6MTY2OTE5MTI1M30.84VCzg15N5l4rtPjRSe3IXs7KZDlXzRiHPEx2DAYWRo',
    );

    const urlencoded = new URLSearchParams();

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    try {
      const response = await fetch(
        'https://04c3-119-235-4-34.au.ngrok.io/api/user/verify',
        requestOptions,
      );
      if (response.ok) {
        const data = await response.json();

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const readNdef = async () => {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      // console.log(tag.ndefMessage[0].payload);
      setScannedText(String.fromCharCode(...tag.ndefMessage[0].payload));
      await verifyToken();
    } catch (ex) {
      // console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
      setScannerActive(false);
    }
  };

  return (
    <View style={styles.container}>
      {scannerActive ? <ActivityIndicator size={40} color={'#ef959c'} /> : null}
      {scannedText ? (
        <View>
          <Text>{scannedText}</Text>
          <Pressable onPress={handleRetry}>
            <View style={styles.retryButton}>
              <Text style={styles.buttonText}>Retry</Text>
            </View>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#ef959c',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
  },
});
