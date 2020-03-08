import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Logo = (props) => {

    return (
        <SafeAreaView style={styles.safeAreaViewWrapper}>
            {props.goBack && <View style={styles.arrowContainer}>
                <Ionicons style={styles.arrow} name='ios-arrow-back' size={23} onPress={() => { props.goBack() }} />
            </View>}
            <Text style={{...styles.logo, color:props.color}}>GrocerEats</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeAreaViewWrapper: {
        backgroundColor: 'white',
        //elevation: 2,
        overflow: 'hidden',
        borderBottomWidth: 0,
        borderBottomColor: Colors.gray
    },
    
    logo: {
        fontFamily: 'coiny',
        color: Colors.blue,
        fontSize: 28,
        alignSelf: 'center'

    },
    arrowContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        height: '100%',
        width: '100%',
    },
    arrow: {
        paddingLeft: '5%'
    }
})

export default Logo
