import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { UIManager, YellowBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GrocerEatsNavigator from './Navigation/GrocerEatsNavigator';
import { Provider, useDispatch } from 'react-redux';
import store from './store/store';
import { init_saved_recipes_db } from './helpers/db';

init_saved_recipes_db().then(()=>{
  console.log("Initialized Saved Recipes Data Base Successfully")
}).catch(err=>{
  console.log("Initializing Saved Recipes Data Base Failed")
  console.log(err)
})

const fetchFonts = () => {
  return Font.loadAsync({
    'coiny': require('./assets/Fonts/coiny-regular.ttf'),
    'sofia': require('./assets/Fonts/Sofia-Regular.ttf'),
    'sofia-med': require('./assets/Fonts/Sofia-Medium.ttf'),
    'sofia-bold': require('./assets/Fonts/Sofia-Bold.ttf'),
  })
}

YellowBox.ignoreWarnings(["Require cycle:"])

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
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <GrocerEatsNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

