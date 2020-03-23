import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, LayoutAnimation, Animated, PanResponder } from 'react-native'
import DefaultText from './DefaultText'
import { Foundation, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { normalizeIconSize, normalizePaddingSize, normalizeMarginSize, normalizeBorderRadiusSize, normalizeWidth } from '../methods/normalizeSizes'
import Colors from '../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct, setCheckOfProduct } from '../store/actions/GroceryListActions'
import { CustomLayoutSpring, CustomLayoutScaleY } from '../constants/LayoutAnimations'
import ProductAmountManager from './ProductAmountManager'

const Product = ({ data }) => {
    const isChecked = useSelector(state => (state.groceryList.productsList.find(item=>item.id === data.id)).isChecked)

    const dispatch = useDispatch()

    const checkboxPressHandler = () => {
        dispatch(setCheckOfProduct(data.id, !isChecked))
    }
    const deleteIconPressHandler = () => {
        LayoutAnimation.configureNext(CustomLayoutScaleY)
        dispatch(removeProduct(data.id));
    }



    return (
        <Animated.View style={[styles.mainProductContainer]}>
            <View style={styles.deleteIconContainer}>
                <TouchableOpacity style={styles.iconTouchable} onPress={deleteIconPressHandler}>
                    <Foundation name="x" size={normalizeIconSize(20)} color={Colors.red} style={styles.deleteIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: data.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
                <DefaultText style={{ ...styles.titleLabel, textDecorationLine: isChecked ? 'line-through' : 'none' }}>{data.title}</DefaultText>
                <ProductAmountManager id={data.id} amountMain={data.amountMain} unitMain={data.unitMain} />
            </View>
            <View style={styles.leftSideIconsContainer}>
                <View style={styles.dragconContainer}>
                    <MaterialCommunityIcons name='unfold-more-horizontal' size={normalizeIconSize(28)} style={styles.dragIcon} />
                </View>

                <View style={styles.checkboxBox}>
                    <TouchableOpacity style={styles.iconTouchable} onPress={checkboxPressHandler}>
                        <Foundation name="check" size={normalizeIconSize(20)} color={Colors.green} style={[styles.checkIcon, { opacity: isChecked ? 1 : 0 }]} />
                    </TouchableOpacity>

                </View>
            </View>

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    mainProductContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: normalizePaddingSize(10)
    },
    iconTouchable: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: normalizePaddingSize(5),
        justifyContent:'center',
        alignItems:'center'
    },
    deleteIconContainer: {
        paddingHorizontal: normalizePaddingSize(10)
    },
    deleteIcon: {

    },
    imageContainer: {
        width: '10%',
        aspectRatio: 1,
        borderRadius: Dimensions.get('window').width / 20,
        overflow: 'hidden',
        elevation: 2,
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    titleLabel: {
        fontSize: 19,
        fontFamily: 'sofia-med',


    },
    infoContainer: {
        paddingTop: normalizePaddingSize(5),
        paddingLeft: normalizePaddingSize(5)
    },
    
    leftSideIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        marginRight: '5%'
    },
    dragconContainer: {
        marginRight: normalizeMarginSize(10)
    },
    checkboxBox: {
        borderWidth: normalizeWidth(3.5),
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalizeBorderRadiusSize(8),
        overflow: 'hidden'
    },
    

})

export default Product
