import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import DefaultText from '../components/DefaultText'
import GroceryListList from '../components/GroceryListList'

const YourGroceryListScreen = (props) => {
    const groceryList = useSelector(state => state.groceryList.productsList);
    //console.log(groceryList)
    return (
        <View style={styles.screen}>
            <Logo color={Colors.green}  />
            <GroceryListList data={groceryList} />
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
