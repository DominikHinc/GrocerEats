import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import DefaultText from './DefaultText'
import { Foundation, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'
import { normalizeIconSize, normalizePaddingSize, normalizeMarginSize, normalizeBorderRadiusSize, normalizeWidth } from '../methods/normalizeSizes'
import Colors from '../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct, setCheckOfProduct, deleteAllProductsMentToBeRemoved } from '../store/actions/GroceryListActions'
import { CustomLayoutSpring, CustomLayoutDelete, CustomLayoutScaleY } from '../constants/LayoutAnimations'
import ProductAmountManager from './ProductAmountManager'
import Animated, { Easing } from 'react-native-reanimated';

const Product = React.memo(({  id, title, imageUrl, amountMain, unitMain, isChecked, moveProductOneIndexUp, moveProductOneIndexDown, index, aisleLength, enableMoving }) => {
    const {
        set,
        cond,
        startClock,
        stopClock,
        clockRunning,
        block,
        timing,
        call,
        debug,
        Value,
        Clock,
        interpolate
    } = Animated;
    // console.log("Rerendering Product " + title + "And aisle legth " + aisleLength)
   
    const [currentIndex, setCurrentIndex] = useState(index)
    const shouldProductBeRemoved = useSelector(state => state.groceryList.idOfProductsToDelete.find(item => item === id))

    const [reanimatedValue, setReanimatedValue] = useState(new Value(1))
    const [productInitialHeight, setProductInitialHeight] = useState(0)
    const dispatch = useDispatch()

    function runTiming(clock, value, dest) {
        const state = {
            finished: new Value(0),
            position: value,
            time: new Value(0),
            frameTime: new Value(0),
        };

        const config = {
            duration: 300,
            toValue: dest,
            easing: Easing.inOut(Easing.cubic),
        };

        return block([

            cond(clockRunning(clock), 0, [
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
            ]),
            timing(clock, state, config),
            cond(state.finished, stopClock(clock)),
            cond(state.finished, call([], () => dispatch(deleteAllProductsMentToBeRemoved()))),
            state.position,
        ]);
    }


    useEffect(() => {
        setCurrentIndex(index)
    }, [index])


    const measureInitialProductHeight = (e) => {
        if (e.nativeEvent.layout.height > productInitialHeight) {
            setProductInitialHeight(e.nativeEvent.layout.height)
        }
    }

    useEffect(() => {
        if (shouldProductBeRemoved !== undefined) {
            startRemoveAnimation();
        }
    }, [shouldProductBeRemoved])

    const startRemoveAnimation = () => {
        setReanimatedValue(runTiming(new Clock(), new Value(1), new Value(0)))
    }

    const checkboxPressHandler = () => {
        dispatch(setCheckOfProduct(id, !isChecked))
    }
    const deleteIconPressHandler = () => {
        dispatch(removeProduct(id));
    }

    const productHeight = interpolate(reanimatedValue, {
        inputRange: [0, 1],
        outputRange: [0, productInitialHeight]
    })

    const productOpacityAndScale = interpolate(reanimatedValue, {
        inputRange: [0, 1],
        outputRange: [0, 1]
    })



    return (
        <Animated.View style={[styles.mainProductContainer, { height: productInitialHeight > 0 ? productHeight : null, opacity: productOpacityAndScale, transform: [{ scaleY: productOpacityAndScale }] }]} onLayout={measureInitialProductHeight} >
            <View style={styles.innerPaddingContainer}>
                <View style={styles.deleteIconContainer}>
                    <TouchableOpacity style={styles.iconTouchable} onPress={deleteIconPressHandler}>
                        <Foundation name="x" size={normalizeIconSize(20)} color={Colors.darkRed} style={styles.deleteIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                </View>
                <View style={styles.infoContainer}>
                    <DefaultText style={{ ...styles.titleLabel, textDecorationLine: isChecked ? 'line-through' : 'none' }}>{title}</DefaultText>
                    <ProductAmountManager id={id} amountMain={amountMain} unitMain={unitMain} />
                </View>
                <View style={styles.leftSideIconsContainer}>
                    <View style={styles.indexIconsContainer}   >
                        {/* <MaterialCommunityIcons name='unfold-more-horizontal' size={normalizeIconSize(28)} style={styles.dragIcon} /> */}
                        <View style={styles.singleIconWrapper}>
                            {currentIndex > 0 && enableMoving === true && <TouchableOpacity style={styles.singleIconTouchable} onPress={() => moveProductOneIndexUp(index)}>
                                <Ionicons name='ios-arrow-up' size={normalizeIconSize(20)} style={styles.indexIcon} />
                            </TouchableOpacity>}
                        </View>
                        <View style={styles.singleIconWrapper}>
                            {currentIndex < aisleLength - 1 && enableMoving === true && <TouchableOpacity style={styles.singleIconTouchable} onPress={() => moveProductOneIndexDown(index)}>
                                <Ionicons name='ios-arrow-down' size={normalizeIconSize(20)} style={styles.indexIcon} />
                            </TouchableOpacity>}
                        </View>

                    </View>
                    <View style={{paddingRight:normalizePaddingSize(7)}}>
                        <TouchableOpacity style={styles.iconTouchable} onPress={checkboxPressHandler}>
                            <View style={styles.checkboxBox}>
                                <Foundation name="check" size={normalizeIconSize(20)} color={Colors.green} style={[styles.checkIcon, { opacity: isChecked ? 1 : 0 }]} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    mainProductContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        // paddingVertical: normalizePaddingSize(10)
    },
    innerPaddingContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: normalizePaddingSize(10)
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
        width: '55%',
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
    iconTouchable: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        
    
    },
    checkboxBox: {
        borderWidth: normalizeWidth(3.5),
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalizeBorderRadiusSize(8),
        overflow: 'hidden',
    },
    checkIcon: {

    },
    singleIconWrapper: {
        height: Dimensions.get('window').width / 15,
        paddingHorizontal: normalizePaddingSize(15),
        borderWidth: 1,
        borderColor: 'white'
    },
    singleIconTouchable: {
        justifyContent: 'center',
        flex: 1
    }


})

export default Product
