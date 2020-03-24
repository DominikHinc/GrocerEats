import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, LayoutAnimation, Dimensions } from 'react-native'
import DefaultText from './DefaultText'
import Product from './Product'
import { normalizePaddingSize, normalizeBorderRadiusSize, normalizeIconSize } from '../methods/normalizeSizes'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { CustomLayoutScaleY, CustomLayoutSpring } from '../constants/LayoutAnimations'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import { setNewProductsList } from '../store/actions/GroceryListActions'

const Aisle = ({ aisle, data }) => {

    const [aisleVivible, setAisleVivible] = useState(aisle === "All" ? true : false)
    const [iconAnimatiedValue, setIconAnimatiedValue] = useState(new Animated.Value(aisle === "All" ? 0 : 1))
    const [canMove, setCanMove] = useState(true)
    
    const dispatch = useDispatch()

    

    const renderAisleProducts = () => {

        return data.map((item, index) => {

            return <Product key={item.id} data={item} index={index} aisleLength={data.length} enableMoving={aisle === "All"}
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
            const currnetArrayCopy = data;
            const movedItemCopy = currnetArrayCopy[index]
            currnetArrayCopy[index] = currnetArrayCopy[index - 1]
            currnetArrayCopy[index - 1] = movedItemCopy;
            setCanMove(false)
            LayoutAnimation.configureNext(CustomLayoutSpring,()=>{setCanMove(true)});
            dispatch(setNewProductsList(currnetArrayCopy))
        }

    }
    const moveProductOneIndexDown = (index) => {
        console.log(canMove)
        if (canMove === true) {
            console.log("Moving " + index + " One down")
            const currnetArrayCopy = data;
            const movedItemCopy = currnetArrayCopy[index]
            currnetArrayCopy[index] = currnetArrayCopy[index + 1]
            currnetArrayCopy[index + 1] = movedItemCopy;
            setCanMove(false)
            LayoutAnimation.configureNext(CustomLayoutSpring,()=>{setCanMove(true)});
            dispatch(setNewProductsList(currnetArrayCopy))
        }

    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.aisleTitleContainer}>
                <View style={styles.aisleBackgroundColorWrapper}>
                    <DefaultText style={styles.aisleTitle}>{aisle}</DefaultText>
                    <Animated.View style={[styles.showMoreIconContainer, iconRotation]}>
                        <Ionicons name='ios-arrow-dropdown-circle' size={normalizeIconSize(25)} style={styles.showMoreIcon} onPress={showMoreIconHandler} color={Colors.green} />
                    </Animated.View>
                </View>
            </View>
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
    aisleBackgroundColorWrapper: {
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: normalizePaddingSize(10),
        paddingHorizontal: normalizePaddingSize(20),
        backgroundColor: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    aisleTitle: {
        fontSize: 20,
        fontFamily: 'sofia-bold'
    },
    showMoreIconContainer: {
        position: 'absolute',
        right: '5%',

    },
    showMoreIcon: {

    },
    productsListContainer: {

    },


})

export default Aisle
