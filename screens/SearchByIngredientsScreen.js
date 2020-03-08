import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'

const SearchByIngredientsScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Logo color={Colors.yellow} />
            <Text>SearchByIngradientsScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white'
    }
})

export default SearchByIngredientsScreen
