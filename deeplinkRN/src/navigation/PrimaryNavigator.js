import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Scanner from '../screens/Scanner';

const Stack = createNativeStackNavigator();

const PrimaryNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Scanner" component={Scanner} />
  </Stack.Navigator>
);

export default PrimaryNavigator;
