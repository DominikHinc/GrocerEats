import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, UIManager } from 'react-native';
import GrocerEatsNavigator from './Navigation/GrocerEatsNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'coiny': require('./assets/Fonts/coiny-regular.ttf'),
    'sofia': require('./assets/Fonts/Sofia-Regular.ttf'),
    'sofia-med': require('./assets/Fonts/Sofia-Medium.ttf'),
    'sofia-bold': require('./assets/Fonts/Sofia-Bold.ttf'),
  })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFonts}
      onFinish={() => {
        setFontsLoaded(true)
      }} />
  }


  return (
    <NavigationContainer>
      <GrocerEatsNavigator />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
