import React, { useRef, useMemo, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, Image, PanResponder } from 'react-native'
import Colors from '../constants/Colors';
import DefaultText from './DefaultText';
import { Ionicons, Entypo } from '@expo/vector-icons'
import { normalizeMarginSize, normalizePaddingSize, normalizeIconSize } from '../methods/normalizeSizes';


const SwipableCard = (props) => {
    const { item, setScrolling, setInfoForModal } = props;
    const translateX = useRef(new Animated.ValueXY()).current; 

    const rounderdAmount = item.measures.metric.amount > 1 ? Math.round(item.measures.metric.amount) : Math.round(item.measures.metric.amount * 100) / 100


    const startReturnToOrginalPositionAnimation = () => {
        Animated.spring(translateX.x, {
            toValue: 0,
            bounciness: 100,
            overshootClamping: true
        }).start();
    }

    const modalShouldAppear = () => {
        setInfoForModal({
            modalVisible: true,
            title: item.name,
            imageUrl: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
            amount:rounderdAmount,
            unitMetric:item.measures.metric.unitShort,
            unitUs:item.measures.us.unitShort

        })
    }

    const panResponder = React.useMemo(() => PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onShouldBlockNativeResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            //console.log(translateX.x)
            setScrolling(false)
            gestureState.dx > 0 ? null : gestureState.dx <= -Dimensions.get('window').width / 4 ? null : translateX.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
            setScrolling(false)

        },
        onPanResponderRelease: (evt, gestureState) => {
            setScrolling(true)
            startReturnToOrginalPositionAnimation();
            gestureState.dx <= (-Dimensions.get('window').width / 4)+normalizeIconSize(30)  ? modalShouldAppear() : null
        },
        onPanResponderTerminate: (evt, gestureState) => {
            setScrolling(true)
            startReturnToOrginalPositionAnimation();
            gestureState.dx <= (-Dimensions.get('window').width/ 4)+normalizeIconSize(30) ? modalShouldAppear() : null
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

    return (
        <Animated.View style={styles.netherContainer}>
            <Animated.View style={[styles.ingredientContainer, { transform: [{ translateX: translateX.x }] }]} >
                <View style={styles.ingredientImageRoundWrapper}>
                    <Image source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }} style={styles.ingredientImage} />
                </View>
                <View style={styles.ingredientInfoContainer}>
                    <DefaultText style={styles.ingredientNameLabel} >{item.name[0].toUpperCase() + item.name.slice(1, item.name.length)}</DefaultText>
                    <DefaultText style={styles.ingredientNameLabel}>{rounderdAmount} {item.measures.metric.unitShort}</DefaultText>
                </View>
                <View style={styles.draggableArrowContainer} {...panResponder.panHandlers}>
                    <Ionicons name='ios-arrow-dropleft' size={normalizeIconSize(27) } />
                </View>

            </Animated.View>
            <Animated.View style={[styles.plusIconContainer, plusIconContainerScale, { paddingRight: plusIconContainerPaddingRight }]} >
                <Entypo name='plus' size={normalizeIconSize(33)} style={{ ...styles.plusIcon }} />
            </Animated.View>

        </Animated.View>

    )
}

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
        paddingLeft:normalizePaddingSize(8) 
    },
    ingredientImageRoundWrapper: {
        width: Dimensions.get('window').width / 6,
        aspectRatio: 1,
        borderRadius: Dimensions.get('window').width / 12,
        //borderWidth: 1,
        //borderColor: Colors.gray,
        backgroundColor: 'white',
        elevation:2,
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
        paddingLeft: normalizePaddingSize(10) 
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
    plusIcon: {


    }

})

export default SwipableCard
