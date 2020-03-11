import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Logo from '../components/Logo'
import { TextInput } from 'react-native-gesture-handler';

const MealDetailsScreen = (props) => {
    const {color} = props.route.params;
    
    return (
        <View style={styles.screen}>
            <Logo goBack={()=> props.navigation.goBack()} color={color}/>
            <Text>MealDetailsScreen</Text>
            <TextInput placeholder="XD" />
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'flex-start',
        backgroundColor:'white'
    }
})

export default MealDetailsScreen
