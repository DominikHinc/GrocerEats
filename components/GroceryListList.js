import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Product from './Product'

const renderProduct = ({item,index})=>{
    return <Product title={item.title} amount={item.amount}/>
}

const GroceryListList = ({ data }) => {
    return (
        <View>
            <FlatList data={data} keyExtractor={item=>item.id.toString()} renderItem={renderProduct} />
        </View>
    )
}
const styles = StyleSheet.create({

})

export default GroceryListList
