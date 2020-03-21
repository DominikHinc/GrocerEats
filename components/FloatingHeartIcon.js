import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Animated, Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import Colors from '../constants/Colors'
import { normalizeBorderRadiusSize, normalizeHeight, normalizeIconSize, normalizeMarginSize, normalizePaddingSize, normalizeWidth } from '../methods/normalizeSizes'


const FloatingHeartIcon = React.memo(({ active, id, alignLeft, small, onPress }) => {
    const insets = useSafeArea();

    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(active ? 1 : 0))
    const [isIconActive, setIsIconActive] = useState(active ? true : false)
    const [canIconBePressed, setCanIconBePressed] = useState(true)

    console.log("Floating heart icon rerendering")
    useEffect(() => {
        if(active !== isIconActive){
            //startIconAnimation(active ? 1 : 0)
            setIsIconActive(active);
        } 
    }, [active])


    const startIconAnimation = (toValue)=>{
        Animated.spring(animatedValue, {
            toValue: toValue,
            friction: 10,
            useNativeDriver:true
        }).start(()=>{
            //TODO after integration with SQL is implemented revisit this statement
            onPress()
            setCanIconBePressed(true)
        })
    }

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

    const onPressHandler = ()=>{
        startIconAnimation(isIconActive ? 0 : 1);
        setIsIconActive(prev => !prev)
        setCanIconBePressed(false)
        //onPress()
    }
    


    return (
        <Animated.View style={ [styles.heartIconContainer, iconRotation,
        {height:normalizeHeight(small ? 26 : 52), width: normalizeWidth(small ? 26 : 52),borderRadius: normalizeBorderRadiusSize(small ? 13 : 27)},
        {right: alignLeft ? undefined : '6%', left: alignLeft ? '20%' : undefined,top: alignLeft ? normalizeMarginSize(-5) : insets.top + normalizePaddingSize(7)}
        ] }>
            <TouchableComp disabled={!canIconBePressed} onPress={onPressHandler} style={styles.touchable} background={TouchableNativeFeedback.Ripple(active ? Colors.gray : Colors.red, false)}>
                <View style={styles.innerView}>
                    <AntDesign name="heart" size={normalizeIconSize(small ? 15 : 27)} color={isIconActive ? Colors.red : Colors.gray} style={{ ...styles.heartIcon }} />
                </View>
            </TouchableComp>

        </Animated.View>
    )
})

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
