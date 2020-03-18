import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity, Animated, Image, LayoutAnimation, Keyboard, Dimensions, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSafeArea } from 'react-native-safe-area-context'
import { normalizeIconSize, normalizeWidth, normalizeHeight, normalizeBorderRadiusSize, normalizePaddingSize, normalizeMarginSize } from '../methods/normalizeSizes'
import { Easing } from 'react-native-reanimated'

const FloatingSearchIcon = ({ onPress }) => {

    let keyboardDidShowListener = useRef().current
    let keyboardDidHideListener = useRef().current

    const CustomLayoutSpring = {
        duration: 400,
        create: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
           
        },
        update: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
           
        },
        delete: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
        }

    };

    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShowHandler)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', kyeboardDidHideHandler)
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, [])


    const keyboardDidShowHandler = (e) => {
        LayoutAnimation.configureNext(CustomLayoutSpring)
    }
    const kyeboardDidHideHandler = (e) => {
        LayoutAnimation.configureNext(CustomLayoutSpring)
    }

    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version > 21) {
        TouchableComp = TouchableNativeFeedback;
    }

    return (
       
            <Animated.View style={[styles.searchIconContainer,
            { height: normalizeHeight(52), width: normalizeWidth(52), borderRadius: normalizeBorderRadiusSize(27) },
            { right: '5%', bottom:Dimensions.get('window').width / 20}]}>
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
