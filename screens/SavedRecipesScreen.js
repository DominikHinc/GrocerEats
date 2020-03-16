import React from 'react'
import { View, Text, StyleSheet,SafeAreaView } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'


const SavedRecipesScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Logo color={Colors.red} />
            <Text>Saved Recipes Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white'
    }
})

export default SavedRecipesScreen
