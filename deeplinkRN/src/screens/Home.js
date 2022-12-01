import {StyleSheet, Text, View, Pressable} from 'react-native';

const Home = ({navigation}) => {
  const handleOnPress = () => {
    navigation.navigate('Scanner');
  };

  const handlerWriterPress = () => {
    navigation.navigate('Writer');
  };

  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <View style={styles.bottom}>
        <Pressable onPress={handleOnPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{'Scan RFID'}</Text>
          </View>
        </Pressable>
        <Pressable onPress={handlerWriterPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{'Write RFID Token'}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#ef959c',
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Home;
