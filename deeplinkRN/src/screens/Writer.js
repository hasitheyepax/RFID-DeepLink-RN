import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import base64 from 'react-native-base64';

export default function Writer() {
  const writeNdef = async textMessage => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // const uint8 = new TextEncoder().encode(textMessage);
      const encodedMessage = base64.encode(textMessage);

      console.log(encodedMessage);

      const bytes = Ndef.encodeMessage([
        Ndef.textRecord(
          '$2b$10$wRQ4l6EBso0AoNoztC.0Ru.koWR7w61S.GAXFoe8UExrWHuLYIfSK',
        ),
      ]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);

        if (Platform.OS === 'ios') {
          await NfcManager.setAlertMessageIOS('Success');
        }

        result = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          writeNdef(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzRjNjc2ZGJkY2ZlOTU3Y2U1NzJjZiIsImlhdCI6MTY2OTE5MTI1M30.84VCzg15N5l4rtPjRSe3IXs7KZDlXzRiHPEx2DAYWRo',
          )
        }>
        <View style={styles.retryButton}>
          <Text style={styles.buttonText}>Write</Text>
        </View>
      </Pressable>
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
