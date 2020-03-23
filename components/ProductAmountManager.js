import { Feather } from '@expo/vector-icons'
import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, TextInput, Alert } from 'react-native'
import { normalizeIconSize, normalizeMarginSize, normalizeFontSize } from '../methods/normalizeSizes'
import DefaultText from './DefaultText'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import { editProductAmount } from '../store/actions/GroceryListActions'

const ProductAmountManager = React.memo(({id, amountMain, unitMain }) => {
    const [amountTextInputValue, setAmountTextInputValue] = useState(amountMain.toString())
    const [isEditing, setIsEditing] = useState(false)
    const setAmountText = (text) => {
        setAmountTextInputValue(text);
    }
    const textInputRef = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        if (isEditing) {
            textInputRef.current.focus();
        }
    }, [isEditing])

    useEffect(()=>{
        setAmountText(amountMain.toString())
    },[amountMain])

    const setIsTextinputEditable = (isEditable) => {

        if(isEditable === false){
            const isValid = amountTextInputValue.match(/^-?\d*(\.\d+)?$/);
            if (isValid) {
                //console.log("Object will be edited")
                dispatch(editProductAmount(id, amountTextInputValue))
            } else {
                Alert.alert("Invalid Amount", "You can only enter numbers")
                setAmountText(amountMain)
            }
        }
        setIsEditing(isEditable)

    }



    return (
        <View style={styles.amountMainConatiner}>
            <View style={styles.textInputContainer}>
                <TextInput ref={textInputRef} editable={isEditing} value={amountTextInputValue} onChangeText={setAmountText} 
                style={styles.amountTextInput} maxLength={6} keyboardType='numeric' onSubmitEditing={()=>{setIsTextinputEditable(false)}}  />
            </View>
            {/* <DefaultText style={styles.amountLabel}>{amountMain}</DefaultText> */}
            <DefaultText style={styles.amountLabel}>{unitMain}</DefaultText>
            {isEditing ?
                <Feather name="check" size={normalizeIconSize(18)} style={styles.editIcon} color={Colors.green} onPress={() => setIsTextinputEditable(false)} />
                :
                <Feather name="edit" size={normalizeIconSize(18)} style={styles.editIcon}  onPress={() => setIsTextinputEditable(true)} />
            }

        </View>
    )
})

const styles = StyleSheet.create({
    amountMainConatiner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    amountLabel: {
        marginHorizontal: normalizeMarginSize(5)
    },
    textInputContainer: {

    },
    amountTextInput: {
        fontFamily: 'sofia',
        fontSize: normalizeFontSize(17),
        textAlign: 'center',

    },
    editIcon: {
        marginLeft: normalizeMarginSize(6)
    }
})

export default ProductAmountManager
