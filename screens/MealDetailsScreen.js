import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Logo from '../components/Logo'

const MealDetailsScreen = (props) => {
    const {color} = props.route.params;
    
    return (
        <View style={styles.screen}>
            <Logo goBack={()=> props.navigation.goBack()} color={color}/>
            <Text>MealDetailsScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white'
    }
})

export default MealDetailsScreen
