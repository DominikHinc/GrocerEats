import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DefaultText from './DefaultText'
import Colors from '../constants/Colors'
import { normalizeMarginSize, normalizePaddingSize, normalizeBorderRadiusSize, normalizeIconSize } from '../methods/normalizeSizes'
import { Feather } from '@expo/vector-icons'

const IngredientTag = ({ingredientName, removeIngredient}) => {
    //console.log(ingredientName)
    
    return (
        <View style={styles.mainContainer}>
            <DefaultText>{ingredientName}</DefaultText>
            <Feather name="x" size={normalizeIconSize(17)} onPress={()=>{removeIngredient(ingredientName)}} style={styles.removeIngredientIcon} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        paddingVertical:normalizePaddingSize(5),
        paddingLeft:normalizePaddingSize(20),
        paddingRight:normalizePaddingSize(10),
        backgroundColor:Colors.yellow,
        marginHorizontal:normalizeMarginSize(5),
        borderRadius:normalizeBorderRadiusSize(50),
        flexDirection:'row',
        alignItems:'center'
    },
    removeIngredientIcon:{
        marginLeft:normalizeMarginSize(10)
    }
})

export default IngredientTag
