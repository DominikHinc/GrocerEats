import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { UIManager, YellowBox, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { init_grocery_list_db, init_saved_recipes_db } from './helpers/db';
import GrocerEatsNavigator from './Navigation/GrocerEatsNavigator';
import store from './store/store';

init_saved_recipes_db().then(()=>{
}).catch(err=>{
  Alert.alert("Something went wrong","Error while initializing saved recipes database")
})

init_grocery_list_db().then(()=>{
}).catch(err=>{
  Alert.alert("Something went wrong","Error while initializing grocery list database")
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

