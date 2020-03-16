import React, { useState, useRef, useEffect } from 'react'
import { View, Alert, Image, Modal, StyleSheet, TouchableOpacity, Dimensions, TouchableHighlight, TextInput, Keyboard, Picker, } from 'react-native'
import DefaultText from './DefaultText';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors';
import { normalizeBorderRadiusSize, normalizePaddingSize, normalizeFontSize, normalizeIconSize, normalizeMarginSize, normalizeWidth, normalizeHeight } from '../methods/normalizeSizes';

const AmountOfGroceriesManager = (props) => {
    const { closeModal, textInputRef, amount, setAmount, selectedUnit, setSelectedUnit, amountControl, addToGroceryList } = props
    const [tabOfUnits, setTabOfUnits] = useState([{ label: "No Unit", value: "" }, { label: 'g', value: 'g' }]);

    useEffect(() => {
        //Because picker does not allow creating dynamic list inside of its body the unit list must be created seperatly

        setTabOfUnits([{ label: "No Unit", value: "" }]);
        if (amountControl.unitMain.length > 0) {
            setTabOfUnits(prev => [...prev, { label: amountControl.unitMain, value: amountControl.unitMain }])
        }
        if (amountControl.unitMain.toLowerCase() !== amountControl.unitSecondary.toLowerCase() && amountControl.unitSecondary.length > 0) {
            setTabOfUnits(prev => [...prev, { label: amountControl.unitSecondary, value: amountControl.unitSecondary }])
        }
        if (amountControl.unitMain !== 'g' && amountControl.unitSecondary !== 'g') {
            setTabOfUnits(prev => [...prev, { label: 'g', value: 'g' }])
        }
        if (amountControl.unitMain !== 'lb' && amountControl.unitSecondary !== 'lb') {
            setTabOfUnits(prev => [...prev, { label: 'lb', value: 'lb' }])
        }


    }, [])
    const setTextinputText = (text) => {
        setAmount(text.toString())
    }

    const addOneToAmount = () => {
        console.log(parseInt(amount))
        if (amount.length > 0 && parseInt(amount).toString() !== 'NaN') {
            setAmount(prev => (parseInt(prev) + 1).toString())
        } else {
            setAmount('1')
        }
    }
    const substractOneFromAmount = () => {
        if (amount.length > 0 && parseInt(amount) > 0 && parseInt(amount).toString() !== 'NaN') {
            setAmount(prev => (parseInt(prev) - 1).toString())
        } else {
            setAmount('1')
        }
    }

    const pickerValueChangeHandler = (itemValue, itemIndex) => {
        setSelectedUnit(itemValue);
        if (itemValue === amountControl.unitMain) {
            setAmount(amountControl.amountMain.toString());
        } else if (itemValue === amountControl.unitSecondary) {
            setAmount(amountControl.amountSecondary.toString());
        } else {
            setAmount('0');
        }
    }


    const getPickerOptions = () => {
        return tabOfUnits.map(item => <Picker.Item label={item.label} value={item.value} key={item.label} />)
    }

    return (
        <View style={styles.amountDetailsContainer}>
            <View style={styles.addButtonsContainer}>
                <TouchableOpacity style={styles.addButtonTouchable} onPress={closeModal}>
                    <View style={styles.insideOfButton}>
                        <DefaultText>Add Note</DefaultText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButtonTouchable} onPress={addToGroceryList}>
                    <View style={styles.insideOfButton}>
                        <DefaultText>Add</DefaultText>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.amountButtonsContainer}>
                <TouchableOpacity style={styles.touchableButton} onPress={substractOneFromAmount}>
                    <View style={styles.insideOfButton}>
                        <AntDesign name="minus" size={normalizeIconSize(18)} />
                    </View>
                </TouchableOpacity>
                <View style={styles.amountWithUnitContainer}>

                    <TextInput style={styles.amountTextInput} maxLength={6} keyboardType='numeric' value={amount}
                        onChangeText={setTextinputText} onSubmitEditing={addToGroceryList} ref={textInputRef} />

                    <DefaultText style={styles.unitLabel}> {selectedUnit}</DefaultText>

                    <View style={styles.pickerContainer}>
                        <Ionicons style={styles.pickerIcon} name="ios-arrow-down" size={normalizeIconSize(18)} />
                        <View style={{opacity:0}}>
                            <Picker
                                enabled={true}
                                selectedValue={selectedUnit}
                                style={styles.unitPicker}
                                prompt="Select unit"
                                onValueChange={pickerValueChangeHandler}>
                                {getPickerOptions()}
                            </Picker>
                        </View>

                    </View>
                </View>


                <TouchableOpacity style={styles.touchableButton} onPress={addOneToAmount}>
                    <View style={styles.insideOfButton}>

                        <AntDesign name="plus" size={normalizeIconSize(18)} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.amountLabelContainer}>
                <DefaultText style={styles.amountLabel}>Amount:</DefaultText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    amountDetailsContainer: {
        flexDirection: 'column-reverse',
        flex: 1,
        width: '100%',
        paddingBottom: normalizePaddingSize(15)
    },
    amountButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: normalizePaddingSize(17)
    },
    amountButtonLabel: {
        fontFamily: 'sofia-bold',
        fontSize: 25,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchableButton: {
        backgroundColor: 'white',
        width: '12%',
        aspectRatio: 1,
        borderRadius: normalizeBorderRadiusSize(10),
        elevation: 2,
        marginHorizontal: '5%'
    },
    insideOfButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    addButtonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: normalizePaddingSize(5),
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    addButtonTouchable: {
        backgroundColor: 'white',
        width: '25%',
        aspectRatio: 1.9,
        borderRadius: normalizeBorderRadiusSize(10),
        elevation: 2,
    },
    amountLabelContainer: {
        paddingBottom: normalizePaddingSize(10)
    },
    amountLabel: {
        textAlign: 'center',
        fontFamily: 'sofia-med',
        fontSize: 18,

    },
    amountTextInput: {
        fontFamily: 'sofia',
        textAlign: 'center',
        //borderBottomWidth: 1,
        //borderColor: Colors.lightGray,
        paddingHorizontal: normalizePaddingSize(10),
        fontSize: normalizeFontSize(18),

    },
    amountWithUnitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: normalizePaddingSize(12),
        //borderWidth:1
    },
    unitLabel: {
        paddingLeft: normalizePaddingSize(3)
    },
    pickerContainer: {
        flexDirection: 'row',
        //width: '45%',
        //borderWidth: 1,
        alignItems: 'center',
        justifyContent:'center',
        //borderWidth: 1,
        //opacity:0
    },
    unitPicker: {
        borderWidth: 1,
        paddingLeft: normalizePaddingSize(50),
        width: normalizeWidth(10),
        height: normalizeHeight(30),
        marginLeft: normalizeMarginSize(-20),
        //borderWidth: 1,
        color: "transparent",
        backgroundColor:'white'

    },
    pickerIcon: {
        position: 'absolute'
    }
})

export default AmountOfGroceriesManager
