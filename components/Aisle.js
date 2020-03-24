import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, LayoutAnimation, Dimensions, TouchableOpacity } from 'react-native'
import DefaultText from './DefaultText'
import Product from './Product'
import { normalizePaddingSize, normalizeBorderRadiusSize, normalizeIconSize, normalizeMarginSize } from '../methods/normalizeSizes'
import Colors from '../constants/Colors'
import { Ionicons, Foundation, MaterialCommunityIcons } from '@expo/vector-icons'
import { CustomLayoutScaleY, CustomLayoutSpring } from '../constants/LayoutAnimations'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import { setNewProductsList, removeProduct, removeMultipleProduct, setCheckOfProduct, setCheckOfMultipleProducts } from '../store/actions/GroceryListActions'

const Aisle = ({ aisle, data, allowAnimation }) => {

    const [aisleVivible, setAisleVivible] = useState(aisle === "All" ? true : false)
    const [iconAnimatiedValue, setIconAnimatiedValue] = useState(new Animated.Value(aisle === "All" ? 0 : 1))
    const [canMove, setCanMove] = useState(true)

    const dispatch = useDispatch()

    const [localData, setLocalData] = useState(data)
    // LayoutAnimation.configureNext(CustomLayoutScaleY)
    useEffect(() => {
        //This workaround is used because LayoutAnimation Buggs when applied before redux state change
        //Animations Bugg whole list 
        // if (data.length === localData.length - 1 && aisleVivible === true) {
        //     LayoutAnimation.configureNext(CustomLayoutScaleY)
        // }
        console.log("Allow Animation for " + aisle + " " + allowAnimation)
        
        if (aisle === "All") {
            LayoutAnimation.configureNext(CustomLayoutScaleY)
        }

        setLocalData(data)
    }, [data])

    const renderAisleProducts = () => {

        return localData.map((item, index) => {

            return <Product key={item.id} data={item} index={index} aisleLength={localData.length} enableMoving={aisle === "All"}
                moveProductOneIndexDown={moveProductOneIndexDown} moveProductOneIndexUp={moveProductOneIndexUp} />
        })
    }

    const startIconAnimation = () => {
        Animated.spring(iconAnimatiedValue, {
            toValue: aisleVivible ? 1 : 0,
            bounciness: 10,
            useNativeDriver: true
        }).start()
    }

    const showMoreIconHandler = () => {
        LayoutAnimation.configureNext(CustomLayoutScaleY);
        setAisleVivible(prev => !prev)
        startIconAnimation();
    }

    const iconRotation = {
        transform: [{
            rotate: iconAnimatiedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["180deg", "360deg"]
            })
        }]
    }
    const moveProductOneIndexUp = (index) => {
        console.log(canMove)
        if (canMove === true) {
            console.log("Moving " + index + " One up")
            const currnetArrayCopy = localData;
            const movedItemCopy = currnetArrayCopy[index]
            currnetArrayCopy[index] = currnetArrayCopy[index - 1]
            currnetArrayCopy[index - 1] = movedItemCopy;
            setCanMove(false)
            LayoutAnimation.configureNext(CustomLayoutSpring, () => { setCanMove(true) });
            dispatch(setNewProductsList(currnetArrayCopy))
        }

    }
    const moveProductOneIndexDown = (index) => {
        console.log(canMove)
        if (canMove === true) {
            console.log("Moving " + index + " One down")
            const currnetArrayCopy = localData;
            const movedItemCopy = currnetArrayCopy[index]
            currnetArrayCopy[index] = currnetArrayCopy[index + 1]
            currnetArrayCopy[index + 1] = movedItemCopy;
            setCanMove(false)
            LayoutAnimation.configureNext(CustomLayoutSpring, () => { setCanMove(true) });
            dispatch(setNewProductsList(currnetArrayCopy))
        }

    }

    const deleteAllAisleProducts = () => {
        const idsArray = localData.map(item => {
            return item.id
        })
        dispatch(removeMultipleProduct(idsArray))
    }

    const checkAllAisleProducts = () => {
        let shouldCheckAll = false;
        const idsArray = localData.map(item => {
            if (item.isChecked === false) {
                shouldCheckAll = true
            }
            return item.id
        })
        dispatch(setCheckOfMultipleProducts(idsArray, shouldCheckAll))
    }
    const removeCheckedProducts = () => {
        let idsArray = [];
        localData.forEach(item => {
            if (item.isChecked === true) {
                idsArray = [...idsArray, item.id]
            }
        })
        dispatch(removeMultipleProduct(idsArray))
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.aisleTitleContainer}>
                <View style={styles.aisleBackgroundColorWrapper}>

                    <View style={styles.aisleTitleWidthReducer}>
                        <DefaultText style={styles.aisleTitle}>{aisle}</DefaultText>
                    </View>

                    <Animated.View style={[styles.showMoreIconContainer, iconRotation]}>
                        <TouchableOpacity style={styles.showMoreTouchable} onPress={showMoreIconHandler}>
                            <Ionicons name='ios-arrow-dropdown-circle' size={normalizeIconSize(25)} style={styles.showMoreIcon} color={Colors.green} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
            {aisleVivible && <View style={styles.aisleEditOptionsContainer}>
                <View style={styles.deleteAllAisleProductsContainer}>
                    <TouchableOpacity onPress={deleteAllAisleProducts} style={styles.editOptionTouchable}>
                        <Foundation name="x" size={normalizeIconSize(15)} color={Colors.darkRed} style={styles.editOptionIcon} />
                        <DefaultText style={styles.editOptionLabel}>Remove All</DefaultText>
                    </TouchableOpacity>
                </View>
                <View style={styles.deleteAllAisleProductsContainer}>
                    <TouchableOpacity onPress={removeCheckedProducts} style={styles.editOptionTouchable}>
                        <MaterialCommunityIcons name="close-box-outline" size={normalizeIconSize(15)} color={Colors.darkRed} style={styles.editOptionIcon} />
                        <DefaultText style={styles.editOptionLabel}>Remove Checked</DefaultText>
                    </TouchableOpacity>
                </View>
                <View style={styles.deleteAllAisleProductsContainer}>
                    <TouchableOpacity onPress={checkAllAisleProducts} style={styles.editOptionTouchable}>
                        <MaterialCommunityIcons name="checkbox-multiple-marked-outline" size={normalizeIconSize(15)} color={Colors.green} style={styles.editOptionIcon} />
                        <DefaultText style={styles.editOptionLabel}>Check All</DefaultText>
                    </TouchableOpacity>
                </View>
            </View>}
            {aisleVivible && <View style={styles.productsListContainer}>
                {renderAisleProducts()}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {

    },
    aisleTitleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',


    },
    aisleTitleWidthReducer: {
        width: '85%',
        paddingLeft: normalizePaddingSize(10)
        //borderWidth: 1
    },
    aisleBackgroundColorWrapper: {
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: normalizePaddingSize(10),
        paddingHorizontal: normalizePaddingSize(5),
        backgroundColor: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    aisleTitle: {
        fontSize: 20,
        fontFamily: 'sofia-bold'
    },
    deleteAllAisleProductsContainer: {
        paddingHorizontal: normalizePaddingSize(10)
    },
    deleteAllAisleProductsIcon: {

    },
    showMoreIconContainer: {
        position: 'absolute',
        right: '5%',

    },
    showMoreTouchable: {
        flex: 1,
        padding: normalizePaddingSize(10),
        //borderWidth: 1
    },
    showMoreIcon: {

    },
    aisleEditOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },
    editOptionTouchable: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    editOptionLabel: {
        fontSize: 15,
        color: Colors.darkGray
    },
    editOptionIcon: {
        marginRight: normalizeMarginSize(5)
    },
    productsListContainer: {

    },


})

export default Aisle
