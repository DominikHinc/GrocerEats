import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import IngredientTag from './IngredientTag'
import { normalizePaddingSize, normalizeHeight, normalizeWidth } from '../methods/normalizeSizes'

const IngredientsList = ({ingredientsList, removeIngredient}) => {
    //console.log(ingredientsList)
    const renderIngredientsList = ({item, index})=>{
        return <IngredientTag ingredientName={item} removeIngredient={removeIngredient} />
    }

    return (
        <View>
            <FlatList style={styles.list} contentContainerStyle={styles.listContainer} horizontal={true} keyboardShouldPersistTaps='always'
            showsHorizontalScrollIndicator={false} data={ingredientsList} keyExtractor={(item, index)=> item} renderItem={renderIngredientsList} />
        </View>
    )
}

const styles = StyleSheet.create({
    list:{
        
    },
    listContainer:{
        paddingVertical:normalizePaddingSize(10),
        minHeight:normalizeHeight(30),
        minWidth:normalizeWidth(60),
        
    }
})

export default IngredientsList
