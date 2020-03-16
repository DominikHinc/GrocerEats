import React, { useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useSafeArea } from 'react-native-safe-area-context'
import DefaultText from './DefaultText'
import { normalizeIconSize, normalizeFontSize } from '../methods/normalizeSizes'


const Logo = (props) => {
    const insets = useSafeArea();

    return (
        <Animated.View {...props} style={{ ...styles.safeAreaViewWrapper, paddingTop: insets.top, ...props.logoContainerStyle }}>
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
        // borderBottomWidth: 0,
        // borderBottomColor: Colors.gray,

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
