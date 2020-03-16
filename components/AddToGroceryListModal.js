import React, { useState, useRef, useEffect } from 'react'
import { View, Alert, Image, Modal, StyleSheet, TouchableOpacity, Dimensions, TouchableHighlight, TextInput, Keyboard, Picker, } from 'react-native'
import DefaultText from './DefaultText';
import { Feather, AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors';
import { normalizeBorderRadiusSize, normalizePaddingSize, normalizeFontSize, normalizeIconSize } from '../methods/normalizeSizes';

const AddToGroceryListModal = (props) => {
    const { setModalVisible, modalVisible, imageUrl, title, unitUs, unitMetric } = props;
    //console.log(title)

    const [amount, setAmount] = useState(props.amount.toString())
    const [keyboardIsDisplayed, setKeyboardIsDisplayed] = useState(false)
    const [selectedUnit, setSelectedUnit] = useState(unitMetric)

    let keyboardDidShowListener = useRef().current
    let keyboardDidHideListener = useRef().current
    const textInputRef = useRef()

    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardIsDisplayed(true))
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardIsDisplayed(false))
        return () => {
            //console.log('All subscriptions from modal will be canceled')
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, [])
    useEffect(() => {
        if (modalVisible) {
            textInputRef.current.focus();
            setSelectedUnit(unitMetric)
        }
    }, [modalVisible])

    const closeModal = (elementCallingThis) => {
        if (keyboardIsDisplayed && elementCallingThis === 'background') {
            Keyboard.dismiss()
        } else {
            setModalVisible(false)
        }

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
    const setTextinputText = (text) => {
        setAmount(text.toString())
    }

    const addToGroceryList = () => {
        const isValid = amount.match(/^-?\d*(\.\d+)?$/);
        if (isValid) {
            closeModal()
        } else {
            Alert.alert("Invalid Amount", "You can only enter numbers")
        }
    }

    const modalShowHandler = () => {
        setAmount(props.amount.toString())
    }

    return (
        <Modal
            onShow={modalShowHandler}
            style={styles.modal}
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}>
            <View style={styles.mainModalView}>
                <TouchableOpacity style={styles.dismissModalTouchable} activeOpacity={1} onPress={() => { closeModal('background') }}>
                    <View style={styles.mainCardContainer}>
                        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}>
                            <View>
                                <View style={styles.cardTitleAndDismissIconContainer}>
                                    <Feather name="x" size={normalizeIconSize(25)} onPress={closeModal} style={styles.dismissIcon} />
                                    <DefaultText style={styles.cardTitle}>Add To Your Grocery List</DefaultText>
                                </View>
                                <View style={styles.imageContainer}>
                                    <View style={styles.imageRoundWrapper}>
                                        <Image source={{ uri: imageUrl }} style={styles.image} />
                                    </View>

                                </View>
                                <View style={styles.titleContainer}>
                                    <DefaultText style={styles.title}>{title[0].toUpperCase() + title.slice(1, title.length)}</DefaultText>
                                </View>
                                <View style={styles.additionalInfoContainer}>
                                    <DefaultText style={{ textAlign: 'center', color: Colors.red }}>This item is not on your list</DefaultText>
                                </View>
                            </View>
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

                                            <Picker
                                                enabled={true}
                                                selectedValue={selectedUnit}
                                                style={styles.unitPicker}
                                                prompt="Select unit"
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setSelectedUnit(itemValue)
                                                }>
                                                <Picker.Item label="No Unit" value=" " />
                                                {unitMetric.length > 0 && <Picker.Item label={unitMetric} value={unitMetric} />}
                                                {unitMetric !== unitUs && <Picker.Item label={unitUs} value={unitUs} />}
                                                {unitMetric !== 'g' && <Picker.Item label={'g'} value={'g'} />}
                                                {unitUs !== 'lb' && <Picker.Item label={'lb'} value={'lb'} />}
                                            </Picker>
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
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modal: {

    },
    mainModalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',


    },
    mainCardContainer: {
        width: '80%',
        aspectRatio: 0.9,
        backgroundColor: 'white',
        borderRadius: normalizeBorderRadiusSize(28),
        elevation: 5,
        overflow: 'hidden'

    },
    dismissModalTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardTitleAndDismissIconContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingLeft: '5%',
        paddingTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardTitle: {
        fontFamily: 'sofia-med',
        fontSize: 19
    },
    dismissIcon: {
        position: 'absolute',
        top: Dimensions.get('window').width * 0.8 * 0.05,
        right: Dimensions.get('window').width * 0.8 * 0.05,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: normalizePaddingSize(10)
    },
    imageRoundWrapper: {
        width: Dimensions.get('window').width * 0.2,
        aspectRatio: 1,
        borderRadius: Dimensions.get('window').width * 0.1,
        overflow: 'hidden',
        //borderWidth: 1,
        //borderColor: Colors.gray,
        elevation: 2,
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'sofia-bold',
        fontSize: 21
    },
    additionalInfoContainer: {
        paddingTop: '2%'
    },
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
        paddingBottom: 15
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
        paddingLeft: 10,
        //borderWidth:1
    },
    unitLabel: {
        paddingLeft: 1
    },
    pickerContainer: {
        flexDirection: 'row',
        //width: '45%',
        //borderWidth: 1,
        alignItems: 'center',

    },
    unitPicker: {
        borderWidth: 1,
        paddingLeft: 50,
        width: 10,
        height: 30,
        marginLeft: -20,

    }
})
export default AddToGroceryListModal
