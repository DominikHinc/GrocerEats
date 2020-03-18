import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity, Animated, Image, LayoutAnimation, Keyboard, Dimensions, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSafeArea } from 'react-native-safe-area-context'
import { normalizeIconSize, normalizeWidth, normalizeHeight, normalizeBorderRadiusSize, normalizePaddingSize, normalizeMarginSize } from '../methods/normalizeSizes'
import { Easing } from 'react-native-reanimated'

const FloatingSearchIcon = ({ active, onPress, wholeScreenHeight }) => {
    const insets = useSafeArea();

    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(1))

    let keyboardDidShowListener = useRef().current
    let keyboardDidHideListener = useRef().current
    const [keyboardheight, setkeyboardheight] = useState(0)
    //let keyboardheight = useRef(0).current
    let insetBottomGreatestValue = useRef(0).current

    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShowHandler)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', kyeboardDidHideHandler)
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, [])

    useEffect(()=>{
        console.log("Insest bottom changed")
        if(insets.bottom > insetBottomGreatestValue){
            insetBottomGreatestValue = insets.bottom
        }
    },[insets.bottom])


    const startIconAnimation = (keyboardActive) => {
        // console.log('Keyboard height')
        // console.log(keyboardheight)
        Animated.spring(animatedValue, {
            toValue: keyboardActive ? 1 : 0,
            bounciness: 5,
            // duration: 350,
            delay: keyboardActive ? 0 : 100,
         
        }).start()
    }

    const keyboardDidShowHandler = (e) => {
        // console.log("Around this should be resault: ")
        // console.log(keyboardheight)
        // console.log("Screen height: ")
        // console.log(Dimensions.get('screen').height)
        // console.log("Screen window height: ")
        // console.log(Dimensions.get('window').height)
        // console.log("Parent view height: ")
        // console.log(wholeScreenHeight)
        // console.log("Inset top: ")
        // console.log(insets.top)
        // console.log("Inset Bottom greatest value")
        // console.log(insetBottomGreatestValue)
        console.log(keyboardheight - (Dimensions.get('screen').height - wholeScreenHeight))
        if (keyboardheight !== e.endCoordinates.height) {
            //keyboardheight = 
            setkeyboardheight(e.endCoordinates.height)
        }
        startIconAnimation(true)
    }
    const kyeboardDidHideHandler = (e) => {
        console.log("Inset Bottom")
        console.log(insets.bottom)
        startIconAnimation(false)
    }


    const onLayout = (e)=>{
        console.log("On layout: ")
        console.log(e)
    }

    const iconBottomDistance = {
        transform: [{
            translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [normalizeHeight(-20), -(insetBottomGreatestValue - (Dimensions.get('screen').height - Dimensions.get('window').height))],

            })
        }]
    }

    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version > 21) {
        TouchableComp = TouchableNativeFeedback;
    }


    return (
       
            <Animated.View style={[styles.searchIconContainer,
            { height: normalizeHeight(52), width: normalizeWidth(52), borderRadius: normalizeBorderRadiusSize(27) },
            { right: '5%', bottom:(keyboardheight - (Dimensions.get('screen').height - wholeScreenHeight)) + normalizeHeight(52)  }]}>
                <TouchableComp onPress={onPress} style={styles.touchable}>
                    <View style={styles.innerView}>
                        <Ionicons style={styles.searchIcon} name="ios-search" size={normalizeIconSize(27)} />
                    </View>
                </TouchableComp>
            </Animated.View>
    )
}

const styles = StyleSheet.create({
    keyboardAvoidingView:{
        position:'absolute',
        height:Dimensions.get('window').height,
        width:Dimensions.get('screen').width,
        //backgroundColor:'red',
        zIndex:1
    },
    searchIconContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        overflow: 'hidden',

        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,



    },
    searchIcon: {
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

export default FloatingSearchIcon
