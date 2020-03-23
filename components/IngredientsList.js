import React from 'react'
import { FlatList, StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { normalizeHeight, normalizePaddingSize, normalizeWidth, normalizeIconSize } from '../methods/normalizeSizes'
import IngredientTag from './IngredientTag'
import { Feather } from '@expo/vector-icons'
import DefaultText from './DefaultText'
import Colors from '../constants/Colors'

const IngredientsList = ({ ingredientsList, removeIngredient, removeAllIngredients }) => {
    //console.log(ingredientsList)
    const renderIngredientsList = ({ item, index }) => {
        return <IngredientTag ingredientName={item} removeIngredient={removeIngredient} />
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.removeAllIngredinetsMainContainer}>
                <TouchableWithoutFeedback onPress={removeAllIngredients} style={styles.removeAllIngredinetsTouchable}>
                    <View style={styles.removeAllIngredinetsInnerContainer}>
                        <Feather style={styles.xIcon} name="x" size={normalizeIconSize(22)} color={Colors.red} />
                        <DefaultText style={styles.allLabel}>All</DefaultText>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <FlatList style={styles.list} contentContainerStyle={styles.listContainer} horizontal={true} keyboardShouldPersistTaps='always'
                showsHorizontalScrollIndicator={false} data={ingredientsList} keyExtractor={(item, index) => item} renderItem={renderIngredientsList} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    list: {

    },
    listContainer: {
        paddingVertical: normalizePaddingSize(10),
        minHeight: normalizeHeight(30),
        minWidth: normalizeWidth(60),

    },
    removeAllIngredinetsMainContainer: {
        position: 'absolute',
        top: normalizePaddingSize(-25),
        left: normalizePaddingSize(3),
        alignItems: 'center',
        width: Dimensions.get('window').width / 5,
       
    },
    removeAllIngredinetsTouchable: {
        flex: 1,
        justifyContent: 'center'
    },
    removeAllIngredinetsInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    allLabel: {
        fontFamily: 'sofia-med',
        
    },
    xIcon: {

    }
})

export default IngredientsList
