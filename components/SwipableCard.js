import React, { useRef, useMemo } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, Image, PanResponder } from 'react-native'
import Colors from '../constants/Colors';
import DefaultText from './DefaultText';
import { Ionicons, Entypo } from '@expo/vector-icons'


const SwipableCard = (props) => {
    const { item, setScrolling } = props;
    const translateX = useRef(new Animated.ValueXY()).current;

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
            Animated.spring(translateX.x, {
                toValue: 0,
                bounciness: 10
            }).start();
        },
        onPanResponderTerminate: (evt, gestureState) => {
            setScrolling(true)
            Animated.spring(translateX.x, {
                toValue: 0,
                bounciness: 10
            }).start();
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
        outputRange: [Dimensions.get('window').width / 8, 0]
    })

    return (
        <Animated.View style={styles.netherContainer}>
            <Animated.View style={[styles.ingredientContainer, { transform: [{ translateX: translateX.x }] }]} >
                <View style={styles.ingredientImageRoundWrapper}>
                    <Image source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }} style={styles.ingredientImage} />
                </View>
                <View style={styles.ingredientInfoContainer}>
                    <DefaultText style={styles.ingredientNameLabel} >{item.name[0].toUpperCase() + item.name.slice(1, item.name.length)}</DefaultText>
                </View>
                <View style={styles.draggableArrowContainer} {...panResponder.panHandlers}>
                    <Ionicons name='ios-arrow-dropleft' size={23} />
                </View>

            </Animated.View>
            <Animated.View style={[styles.plusIconContainer, plusIconContainerScale, {paddingRight:plusIconContainerPaddingRight}]} >
                <Entypo name='plus' size={30} style={{ ...styles.plusIcon }} />
            </Animated.View>

        </Animated.View>

    )
}

const styles = StyleSheet.create({
    netherContainer: {
        //backgroundColor:'red'
    },
    ingredientContainer: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 2
    },
    ingredientImageRoundWrapper: {
        width: Dimensions.get('window').width / 6,
        aspectRatio: 1,
        borderRadius: Dimensions.get('window').width / 12,
        borderWidth: 1,
        borderColor: Colors.gray,
        overflow: 'hidden'
    },
    ingredientImage: {
        width: '100%',
        height: '100%'
    },
    ingredientNameLabel: {
        fontFamily: 'sofia-med'
    },
    ingredientInfoContainer: {
        flex: 0.8
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
