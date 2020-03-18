import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native'

import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useSafeArea } from 'react-native-safe-area-context'
import DefaultText from './DefaultText'
import { normalizeIconSize, normalizeFontSize } from '../methods/normalizeSizes'


const Logo = (props) => {
    const insets = useSafeArea();
    const {shouldLogoBeShown} = props

    const [logoAnimationProgress, setLogoAnimationProgress] = useState(new Animated.Value(shouldLogoBeShown===undefined ? 1 : shouldLogoBeShown ? 1 : 0))
    //let logoInitialHeight = useRef(-1).current;
    const [logoInitialHeight, setLogoInitialHeight] = useState(-1)

    useEffect(()=>{
        shouldLogoBeShown=== undefined ? showLogo() : shouldLogoBeShown ? showLogo() : hideLogo()
        
    },[shouldLogoBeShown])
    
    const hideLogo = () => {
        Animated.timing(logoAnimationProgress, {
            toValue: 0,
            duration: 150,
            easing: Easing.linear
        }).start()
    }
    const showLogo = () => {
        Animated.timing(logoAnimationProgress, {
            toValue: 1,
            duration: 150,
            easing: Easing.linear
        }).start()
    }

    const logoHeight = logoAnimationProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, logoInitialHeight],
    })
    const logoOpacity = logoAnimationProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })
    
    const onLayout = (e)=>{
        //console.log(e)
        if(logoInitialHeight < 0){
            setLogoInitialHeight(e.nativeEvent.layout.height)
            
        }

    }

    console.log(logoInitialHeight)
    //(e) => { logoInitialHeight === -1 ? logoInitialHeight = e.nativeEvent.layout.height : null }
    return (
        <Animated.View onLayout={onLayout}  
        style={{ ...styles.safeAreaViewWrapper, paddingTop: insets.top, height: logoHeight, opacity: logoOpacity }}>
            {props.goBack && <View style={styles.arrowContainer}>
                <Ionicons style={styles.arrow} name='ios-arrow-back' size={normalizeIconSize(23)} onPress={() => { props.goBack() }} />
            </View>}
            <DefaultText style={{ ...styles.logo, color: props.color }}>GrocerEats</DefaultText>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    safeAreaViewWrapper: {
        backgroundColor: 'white',
        //elevation: 2,
        overflow: 'hidden',
    },

    logo: {
        fontFamily: 'coiny',
        color: Colors.blue,
        fontSize: 38,
        alignSelf: 'center'

    },
    arrowContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        width: '100%',
    },
    arrow: {
        paddingLeft: '5%'
    }
})

export default Logo
