import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { Button } from 'react-native-paper'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'
import DefaultText from '../components/DefaultText'

const StandardSearchScreen = (props) => {
    return (
        <SafeAreaView style={styles.screen}>
            <Logo color={Colors.blue} />
            <DefaultText>StandardSearchScreen</DefaultText>
            <Button onPress={()=>{props.navigation.navigate('MealDetails',{color:Colors.blue})}}>XD</Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,

        backgroundColor:'white'
    }
})

export default StandardSearchScreen
