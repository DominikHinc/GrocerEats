import { Ionicons, Entypo } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import Colors from '../constants/Colors'
import { normalizeBorderRadiusSize, normalizeFontSize, normalizeIconSize, normalizePaddingSize } from '../methods/normalizeSizes'

const SearchBar = (props) => {
    const {searchBarTextInputValue, searchBarTextChangedHandler, onSearchPress, backgroundColor, useAddBarPreset, placeholder} = props
    const textInputRef = useRef()

    const distanceFromTopAnimationValue = new Animated.Value(1);
    const [animationCompleted, setAnimationCompleted] = useState(false)

    //Animation Related Functions and Interpolated Variables
    const startAnimationAfterRealase = () => {
        Animated.timing(distanceFromTopAnimationValue, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,

        }).start(() => {
            setAnimationCompleted(true);
            textInputRef.current.focus();
        })
    }

    const searchBarDistanceFromTop = distanceFromTopAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Dimensions.get('window').height/2]
    })

    return (
        <Animated.View style={[styles.searchTextInputAnimatedContainer, { marginTop: searchBarDistanceFromTop }]}>
            <TouchableOpacity style={{ width: '60%' }} activeOpacity={animationCompleted ? 1 : 0.5} onPressOut={animationCompleted ? null : startAnimationAfterRealase} >
                <View style={{...styles.searchTextInputContainer, backgroundColor: backgroundColor === undefined ? Colors.blue : backgroundColor}}>
                    <TextInput ref={textInputRef} style={styles.searchTextInput} placeholder={placeholder === undefined ? "Search" : placeholder}
                        placeholderTextColor={useAddBarPreset ? Colors.lighterGray : Colors.lightGray} editable={animationCompleted}
                        onSubmitEditing={onSearchPress} value={searchBarTextInputValue} onChangeText={searchBarTextChangedHandler} blurOnSubmit={useAddBarPreset ? false : true} />
                        {useAddBarPreset ?
                        <Entypo style={{ paddingRight: normalizePaddingSize(15) }} name="plus" size={normalizeIconSize(23)} onPress={animationCompleted ? onSearchPress : null} />
                        :
                        <Ionicons style={{ paddingRight: normalizePaddingSize(15) }} name="ios-search" size={normalizeIconSize(21)} onPress={animationCompleted ? onSearchPress : null} />  
                        }
                    
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    searchTextInputAnimatedContainer: {
        alignItems: 'center',

    },
    searchTextInputContainer: {
        width: '100%',
        //backgroundColor: Colors.blue,
        borderRadius: normalizeBorderRadiusSize(15),
        flexDirection: 'row',
        alignItems: 'center',

    },
    searchTextInput: {
        //width: '80%',
        flex: 1,
        marginLeft: '5%',
        borderRadius: normalizeBorderRadiusSize(15),
        paddingHorizontal: normalizePaddingSize(15),
        fontFamily: 'sofia',
        fontSize: normalizeFontSize(18),
        paddingVertical: normalizePaddingSize(3)
    },
})

export default SearchBar
