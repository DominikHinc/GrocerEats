import React from 'react'
import { StyleSheet, Text } from 'react-native'

const DefaultText = (props) => {
    return (
        <Text style={{...styles.text,...props.style}} {...props}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:14,
        fontFamily:'sofia'
    }
})

export default DefaultText
