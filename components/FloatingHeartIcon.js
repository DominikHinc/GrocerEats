import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity, Animated, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSafeArea } from 'react-native-safe-area-context'
import { normalizeIconSize, normalizeWidth, normalizeHeight, normalizeBorderRadiusSize, normalizePaddingSize, normalizeMarginSize } from '../methods/normalizeSizes'


const FloatingHeartIcon = (props) => {
    const insets = useSafeArea();
    const { active, id, alignLeft, small } = props

    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(active ? 1 : 0))

    useEffect(() => {
        Animated.spring(animatedValue, {
            toValue: active ? 1 : 0,
            friction: 10,
            useNativeDriver:true
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

    let TouchableComp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version > 21) {
        TouchableComp = TouchableNativeFeedback;
    }
    


    return (
        <Animated.View style={ [styles.heartIconContainer, iconRotation,
        {height:normalizeHeight(small ? 26 : 52), width: normalizeWidth(small ? 26 : 52),borderRadius: normalizeBorderRadiusSize(small ? 13 : 27)},
        {right: alignLeft ? undefined : '6%', left: alignLeft ? '20%' : undefined,top: alignLeft ? normalizeMarginSize(-5) : insets.top + normalizePaddingSize(7)}
        ] }>
            <TouchableComp onPress={props.onPress} style={styles.touchable} background={TouchableNativeFeedback.Ripple(props.active ? Colors.gray : Colors.red, false)}>
                <View style={styles.innerView}>
                    <AntDesign name="heart" size={normalizeIconSize(small ? 15 : 27)} color={active ? Colors.red : Colors.gray} style={{ ...styles.heartIcon }} />
                </View>
            </TouchableComp>

        </Animated.View>
    )
}
const styles = StyleSheet.create({
    heartIconContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        overflow: 'hidden',
        
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        


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
