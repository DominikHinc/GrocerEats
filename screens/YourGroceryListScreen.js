import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'

const YourGroceryListScreen = () => {
    return (
        <View style={styles.screen}>
            <Logo color={Colors.green} />
            <Text>YourGroceryListScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white'
    }
})

export default YourGroceryListScreen
