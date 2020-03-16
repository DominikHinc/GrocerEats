import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { normalizeIconSize } from '../methods/normalizeSizes'

const GoBackArrow = (props) => {
    const insets = useSafeArea();
    return (
        <View style={styles.arrowContainer}>
                <Ionicons style={{...styles.arrow, top:insets.top}} name='ios-arrow-back' size={normalizeIconSize(25)}  onPress={() => { props.goBack() }} />
        </View>
    )
}
const styles = StyleSheet.create({
    arrowContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        flexDirection: 'row',
        
        borderWidth: 0,
        height: '100%',
        width: '100%',
    },
    arrow: {
        paddingLeft: '6%',
        paddingTop:10,
        zIndex:99
    }
})

export default GoBackArrow
