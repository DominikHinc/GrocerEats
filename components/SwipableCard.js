import { Entypo, Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, Dimensions, Image, PanResponder, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import { normalizeIconSize, normalizeMarginSize, normalizePaddingSize } from '../methods/normalizeSizes';
import DefaultText from './DefaultText';
import ProductModel from '../models/ProductModel';


const SwipableCard = React.memo(({ item, setScrolling, setInfoForModal }) => {
    //Variables related to animation
    const translateX = useRef(new Animated.ValueXY()).current;
    //Variables related to units and their amounts
    let rounderdAmountMain = item.amount > 1 ? Math.round(item.amount) : Math.round(item.amount * 100) / 100;
    let rounderdAmountSecondary;
    const unitMain = item.unit;
    const unitSecondary = item.unit === item.measures.metric.unitShort || item.unit === item.measures.metric.unitLong ? item.measures.us.unitShort : item.measures.metric.unitShort;
    //console.log(item)
    if (item.unit === item.measures.metric.unitShort || item.unit === item.measures.metric.unitLong) {
        rounderdAmountSecondary = item.measures.us.amount > 1 ? Math.round(item.measures.us.amount) : Math.round(item.measures.us.amount * 100) / 100
    } else {
        rounderdAmountSecondary = item.measures.metric.amount > 1 ? Math.round(item.measures.metric.amount) : Math.round(item.measures.metric.amount * 100) / 100
    }

    const startReturnToOrginalPositionAnimation = () => {
        Animated.spring(translateX.x, {
            toValue: 0,
            bounciness: 100,
            overshootClamping: true
        }).start();
    }

    const modalShouldAppear = () => {
        setInfoForModal(new ProductModel(item.id, item.name, `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,rounderdAmountMain,rounderdAmountSecondary,
        unitMain,unitSecondary,item.aisle))
    }

    const panResponder = React.useMemo(() => PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onShouldBlockNativeResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            //console.log(translateX.x)
            //setScrolling(false)
            gestureState.dx > 0 ? null : gestureState.dx <= -Dimensions.get('window').width / 4 ? null : translateX.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderGrant: (evt, gestureState) => {
            setScrolling(false)

        },
        onPanResponderRelease: (evt, gestureState) => {
            setScrolling(true)
            startReturnToOrginalPositionAnimation();
            gestureState.dx <= (-Dimensions.get('window').width / 4) + normalizeIconSize(30) ? modalShouldAppear() : null
        },
        onPanResponderTerminate: (evt, gestureState) => {
            setScrolling(true)
            startReturnToOrginalPositionAnimation();
            gestureState.dx <= (-Dimensions.get('window').width / 4) + normalizeIconSize(30) ? modalShouldAppear() : null
        },
    }), []);


    const plusIconContainerScale = {
        transform: [{
            scale: translateX.x.interpolate({
                inputRange: [-Dimensions.get('window').width / 4, 0],
                outputRange: [1, 0]
            })
        }]
    }
    const plusIconContainerPaddingRight = translateX.x.interpolate({
        inputRange: [-Dimensions.get('window').width / 4, 0],
        outputRange: [Dimensions.get('window').width / 10, 0]
    })

    const plusIconOpacity = translateX.x.interpolate({
        inputRange: [-Dimensions.get('window').width / 4, 0],
        outputRange: [1, 0]
    })

    return (
        <Animated.View style={styles.netherContainer}>
            <Animated.View style={[styles.ingredientContainer, { transform: [{ translateX: translateX.x }] }]} >
                <View style={styles.ingredientImageRoundWrapper}>
                    <Image source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }} style={styles.ingredientImage} />
                </View>
                <View style={styles.ingredientInfoContainer}>
                    <DefaultText style={styles.ingredientNameLabel} >{item.name[0].toUpperCase() + item.name.slice(1, item.name.length)}</DefaultText>
                    <DefaultText style={styles.ingredientNameLabel}>{rounderdAmountMain} {unitMain}</DefaultText>
                </View>
                <View style={styles.draggableArrowContainer} {...panResponder.panHandlers}>
                    <Ionicons name='ios-arrow-dropleft' size={normalizeIconSize(27)} />
                </View>

            </Animated.View>
            <Animated.View style={[styles.plusIconContainer, plusIconContainerScale, { paddingRight: plusIconContainerPaddingRight, opacity:plusIconOpacity }]} >
                <Entypo name='plus' size={normalizeIconSize(33)} style={{ ...styles.plusIcon }} />
            </Animated.View>

        </Animated.View>

    )
})

const styles = StyleSheet.create({
    netherContainer: {
        //backgroundColor:'red'
        backgroundColor: Colors.gray,
        marginVertical: normalizeMarginSize(8)
    },
    ingredientContainer: {
        width: '100%',
        flexDirection: 'row',
        //marginVertical: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 2,
        paddingLeft: normalizePaddingSize(8)
    },
    ingredientImageRoundWrapper: {
        width: Dimensions.get('window').width / 6,
        aspectRatio: 1,
        borderRadius: Dimensions.get('window').width / 12,
        //borderWidth: 1,
        //borderColor: Colors.gray,
        backgroundColor: 'white',
        elevation: 2,
        overflow: 'hidden',
        zIndex: 0
    },
    ingredientImage: {
        width: '100%',
        height: '100%'
    },
    ingredientNameLabel: {
        fontFamily: 'sofia-med'
    },
    ingredientInfoContainer: {
        flex: 0.8,
        paddingLeft: normalizePaddingSize(10),
        
    },
    draggableArrowContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    plusIconContainer: {
        zIndex: 1,
        position: 'absolute',
        right: 0,
        height: '100%',
        justifyContent: 'center',

    },

})

export default SwipableCard
