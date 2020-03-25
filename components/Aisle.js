import { Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Animated, LayoutAnimation, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Colors from '../constants/Colors'
import { CustomLayoutScaleY } from '../constants/LayoutAnimations'
import { normalizeIconSize, normalizeMarginSize, normalizePaddingSize } from '../methods/normalizeSizes'
import { removeMultipleProduct, setCheckOfMultipleProducts } from '../store/actions/GroceryListActions'
import DefaultText from './DefaultText'

const Aisle = React.memo(({ aisle, data, setVisibility }) => {

    const [aisleVivible, setAisleVivible] = useState(aisle === "All" ? true : false)
    const [iconAnimatiedValue, setIconAnimatiedValue] = useState(new Animated.Value(aisle === "All" ? 0 : 1))

    const dispatch = useDispatch()
    // console.log("Rerendering Aisle " + aisle)
    const startIconAnimation = () => {
        Animated.spring(iconAnimatiedValue, {
            toValue: aisleVivible ? 1 : 0,
            bounciness: 10,
            useNativeDriver: true
        }).start()
    }

    const showMoreIconHandler = () => {
        LayoutAnimation.configureNext(CustomLayoutScaleY);
        setVisibility(aisle,!aisleVivible)
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

    const deleteAllAisleProducts = () => {
        const idsArray = data.map(item => {
            return item.id
        })
        dispatch(removeMultipleProduct(idsArray))
    }

    const checkAllAisleProducts = () => {
        let shouldCheckAll = false;
        const idsArray = data.map(item => {
            if (item.isChecked !== true) {
                shouldCheckAll = true
            }
            return item.id
        })
        dispatch(setCheckOfMultipleProducts(idsArray, shouldCheckAll))
    }
    const removeCheckedProducts = () => {
        let idsArray = [];
        data.forEach(item => {
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
            {/* {aisleVivible && <View style={styles.productsListContainer}>
                {renderAisleProducts()}
            </View>} */}
        </View>
    )
}, (prevProps, nextProps)=>{
    console.log("Prop check in aisle")
    return false
})

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
        backgroundColor:'white'
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
