import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity, Animated, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSafeArea } from 'react-native-safe-area-context'
import { normalizeIconSize, normalizeWidth, normalizeHeight, normalizeBorderRadiusSize } from '../methods/normalizeSizes'


const FloatingHeartIcon = (props) => {
    const insets = useSafeArea();
    const { active } = props

    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.spring(animatedValue, {
            toValue: active ? 1 : 0,
            friction: 10,
        }).start()
    }, [active])

    const iconRotation = {
        transform: [{
            rotate: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })
        }, 
        {
            scale: animatedValue.interpolate({
                inputRange: [0, 0.5,1],
                outputRange: [1,0.5, 1]
            })
        }]
    }

    let TouchableComp;
    if (Platform.OS === 'android' && Platform.Version > 21) {
        TouchableComp = TouchableNativeFeedback;
    }
    if (props.forceOpacity) {
        TouchableComp = TouchableOpacity;
    }


    return (
        <Animated.View style={ [styles.heartIconContainer,{ top: insets.top}, iconRotation] }>
            <TouchableComp onPress={props.onPress} style={styles.touchable} background={TouchableNativeFeedback.Ripple(props.active ? Colors.gray : Colors.red, false)}>
                <View style={styles.innerView}>
                    <AntDesign name="heart" size={normalizeIconSize(27)} color={active ? Colors.red : Colors.gray} style={{ ...styles.heartIcon }} />
                </View>
            </TouchableComp>

        </Animated.View>
    )
}
const styles = StyleSheet.create({
    heartIconContainer: {
        position: 'absolute',
        width: normalizeWidth(52),
        height: normalizeHeight(52),
        backgroundColor: 'white',
        borderRadius: normalizeBorderRadiusSize(27),
        overflow: 'hidden',
        right: 0,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        right: '6%',


    },
    heartIcon: {
        zIndex: 2,
    },
    touchable: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerView: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
})

export default FloatingHeartIcon
