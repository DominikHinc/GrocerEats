import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useSafeArea } from 'react-native-safe-area-context'


const FloatingHeartIcon = (props) => {
    const insets = useSafeArea();
    return (
        <View style={{...styles.heartIconContainer, top:insets.top}}>
            <AntDesign name="heart" size={25} color={Colors.gray} style={styles.heartIcon} />
        </View>
    )
}
const styles = StyleSheet.create({
    heartIconContainer: {
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        overflow: 'hidden',
        top: 0,
        right: 0,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        right: '6%',
        top: 10,

    },
    heartIcon: {
        zIndex: 2,
    },
})

export default FloatingHeartIcon
