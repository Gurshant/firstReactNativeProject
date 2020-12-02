import React, { useRef } from 'react';
import Camera from './Views/Camera';
import Home from './Views/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Camera"
            component={Camera}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

