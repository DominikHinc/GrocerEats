import React from 'react'
import { View, Text, StyleSheet,SafeAreaView } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'


const SearchByNutrientsScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Logo color={Colors.green} />
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

export default SearchByNutrientsScreen
