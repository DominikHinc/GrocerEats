import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, LayoutAnimation, Animated, PanResponder } from 'react-native'
import DefaultText from './DefaultText'
import { Foundation, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'
import { normalizeIconSize, normalizePaddingSize, normalizeMarginSize, normalizeBorderRadiusSize, normalizeWidth } from '../methods/normalizeSizes'
import Colors from '../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct, setCheckOfProduct } from '../store/actions/GroceryListActions'
import { CustomLayoutSpring, CustomLayoutDelete, CustomLayoutScaleY } from '../constants/LayoutAnimations'
import ProductAmountManager from './ProductAmountManager'

const Product = ({ data, moveProductOneIndexUp, moveProductOneIndexDown, index, aisleLength, enableMoving }) => {
    const dispatch = useDispatch()
    const [currentIndex, setCurrentIndex] = useState(index)
    // LayoutAnimation.configureNext(CustomLayoutScaleY)
    useEffect(()=>{
        setCurrentIndex(index)
    },[index])

    const checkboxPressHandler = () => {
        dispatch(setCheckOfProduct(data.id, !data.isChecked))
    }
    const deleteIconPressHandler = () => {
        //LayoutAnimation.configureNext(CustomLayoutScaleY)
        dispatch(removeProduct(data.id));
    }
  

    return (
        <View style={[styles.mainProductContainer]}>
            <View style={styles.deleteIconContainer}>
                <TouchableOpacity style={styles.iconTouchable} onPress={deleteIconPressHandler}>
                    <Foundation name="x" size={normalizeIconSize(20)} color={Colors.darkRed} style={styles.deleteIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: data.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
                <DefaultText style={{ ...styles.titleLabel, textDecorationLine: data.isChecked ? 'line-through' : 'none' }}>{data.title}</DefaultText>
                <ProductAmountManager id={data.id} amountMain={data.amountMain} unitMain={data.unitMain} />
            </View>
            <View style={styles.leftSideIconsContainer}>
                <View style={styles.indexIconsContainer}   >
                    {/* <MaterialCommunityIcons name='unfold-more-horizontal' size={normalizeIconSize(28)} style={styles.dragIcon} /> */}
                    <View style={styles.singleIconWrapper}>
                        {currentIndex > 0 && enableMoving===true && <TouchableOpacity style={styles.singleIconTouchable} onPress={() => moveProductOneIndexUp(index)}>
                            <Ionicons name='ios-arrow-up' size={normalizeIconSize(20)} style={styles.indexIcon} />
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.singleIconWrapper}>
                        {currentIndex < aisleLength-1 && enableMoving===true && <TouchableOpacity style={styles.singleIconTouchable} onPress={() => moveProductOneIndexDown(index)}>
                            <Ionicons name='ios-arrow-down' size={normalizeIconSize(20)} style={styles.indexIcon}  />
                        </TouchableOpacity>}
                    </View>

                </View>

                <View style={styles.checkboxBox}>
                    <TouchableOpacity style={styles.iconTouchable} onPress={checkboxPressHandler}>
                        <Foundation name="check" size={normalizeIconSize(20)} color={Colors.green} style={[styles.checkIcon, { opacity: data.isChecked ? 1 : 0 }]} />
                    </TouchableOpacity>

                </View>
            </View>

        </View>
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
        justifyContent: 'center',
        alignItems: 'center'
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
        paddingLeft: normalizePaddingSize(5),
        width:'55%',
        //borderWidth:1
    },

    leftSideIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        marginRight: '5%'
    },
    indexIconsContainer: {
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
    singleIconWrapper: {
        height: Dimensions.get('window').width / 15,
        paddingHorizontal: normalizePaddingSize(15),
        borderWidth: 1,
        borderColor:'white'
    },
    singleIconTouchable: {
        justifyContent: 'center',
        flex: 1
    }


})

export default Product
