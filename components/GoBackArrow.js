import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { normalizeIconSize, normalizeHeight, normalizeWidth, normalizeBorderRadiusSize } from '../methods/normalizeSizes'

const GoBackArrow = (props) => {
    const insets = useSafeArea();
    let TouchableComp;
    if (Platform.OS === 'android' && Platform.Version > 21) {
        TouchableComp = TouchableNativeFeedback;
    }
    if(props.forceOpacity){
        TouchableComp = TouchableOpacity;
    }

    return (
        <View style={{ ...styles.mainArrowContainer, top: insets.top }}>
            <TouchableComp style={styles.touchable} onPress={() => { props.goBack() }}>
                <View style={styles.innerView}>
                    <Ionicons style={{ ...styles.arrow }} name='ios-arrow-back' size={normalizeIconSize(25)} />
                </View>
            </TouchableComp>

        </View>
    )
}
const styles = StyleSheet.create({
    mainArrowContainer: {
        position: 'absolute',
        left: '3%',
        // left:0
        elevation: 2,
        height: normalizeHeight(52),
        width: normalizeWidth(52),
        borderRadius: normalizeBorderRadiusSize(26),
        //backgroundColor: 'white',
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden'
    },
    touchable:{
        flex:1, 
        width:'100%', 
        height:'100%', 
        justifyContent:'center', 
        alignItems:'center'
    },
    innerView:{
        flex:1, 
        width:'100%', 
        height:'100%', 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:'white'
    },
    arrow: {
        // paddingLeft: '6%',
        // paddingTop:10,
        // zIndex:99
    }
})

export default GoBackArrow
