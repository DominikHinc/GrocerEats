import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DefaultText from './DefaultText'

const Product = ({title, amount}) => {
    console.log(title)
    return (
        <View>
            <DefaultText>{title}</DefaultText>
            <DefaultText>{amount}</DefaultText>
        </View>
    )
}

const style = StyleSheet.create({

})

export default Product
