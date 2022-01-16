import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "../dashboard"
import Player from "../player"
import Tracks from "../track"

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="player" component={Player} />
        <Stack.Screen name="tracks" component={Tracks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};