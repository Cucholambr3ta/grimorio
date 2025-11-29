import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GrimoireOpening } from '../grimoire/components/GrimoireOpening';
import { MagicalContract } from '../auth/screens/MagicalContract';
import { QuestBoard } from '../quest/screens/QuestBoard';
import { CharacterSheet } from '../grimoire/screens/CharacterSheet';

const Stack = createNativeStackNavigator();

export const GrimoireNavigator = () => {
  // We use a state to handle the splash screen transition manually if needed,
  // but here we can just use the navigation stack.
  // However, GrimoireOpening is a Splash Screen replacement.
  // Strategy: Render GrimoireOpening conditionally or as the first screen?
  // If we render it as a screen, we can navigate away from it.
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade', // Smooth transitions
          contentStyle: { backgroundColor: '#000' }, // Avoid white flashes
        }}
      >
        <Stack.Screen name="Splash">
          {(props) => (
            <GrimoireOpening 
              onOpenComplete={() => props.navigation.replace('Auth')} 
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Auth" component={MagicalContract} />
        <Stack.Screen name="QuestBoard" component={QuestBoard} />
        <Stack.Screen name="CharacterSheet" component={CharacterSheet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
