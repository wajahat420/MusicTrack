import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "../dashboard"
import Player from "../player"
import Tracks from "../tracks"
import AddTrack from "../add-track"
import AddSong from "../add-song"
import Location from '../location';
import Songs from '../songs';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
         screenOptions={{
               headerShown: false,
               gestureEnabled: true,
               headerTransparent: true
            }}
      >
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="player" component={Player} />
        <Stack.Screen name="tracks" component={Tracks} />
        <Stack.Screen name="add-track" component={AddTrack} />
        <Stack.Screen name="add-song" component={AddSong} />
        <Stack.Screen name="location" component={Location} />
        <Stack.Screen name="songs" component={Songs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack