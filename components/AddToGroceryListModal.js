import React, { useState, useRef, useEffect } from 'react'
import { View, Alert, Image, Modal, StyleSheet, TouchableOpacity, Dimensions, TouchableHighlight, TextInput, Keyboard, Picker, } from 'react-native'
import DefaultText from './DefaultText';
import { Feather } from '@expo/vector-icons'
import Colors from '../constants/Colors';
import { normalizeBorderRadiusSize, normalizePaddingSize, normalizeFontSize, normalizeIconSize } from '../methods/normalizeSizes';
import AmountOfGroceriesManager from './AmountOfIngradientManager';

const AddToGroceryListModal = (props) => {
    const { setModalVisible, modalVisible, imageUrl, title, amountControl } = props;
    
    //Variables related to amount and unit of ingredient
    const [amount, setAmount] = useState(amountControl.amountMain.toString())
    const [selectedUnit, setSelectedUnit] = useState(amountControl.unitMain)

    //Variables related to text input of amount
    const [keyboardIsDisplayed, setKeyboardIsDisplayed] = useState(false)
    let keyboardDidShowListener = useRef().current
    let keyboardDidHideListener = useRef().current
    const textInputRef = useRef()

    //Use effect will listen to keyboard change event and will clean up when modal is closed
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardIsDisplayed(true))
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardIsDisplayed(false))
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, [])


    //When grocery list is implemented this function will be responsible for adding ingradient to it
    const addToGroceryList = () => {
        const isValid = amount.match(/^-?\d*(\.\d+)?$/);
        if (isValid) {
            closeModalHandler()
        } else {
            Alert.alert("Invalid Amount", "You can only enter numbers")
        }
    }

    //Modal Handlers
    const closeModalHandler = (elementCallingThis) => {
        if (keyboardIsDisplayed && elementCallingThis === 'background') {
            Keyboard.dismiss()
        } else {
            setModalVisible(false)
        }

    }

    const modalShowHandler = () => {
        //What should be set when modal in opening
        setAmount(amountControl.amountMain.toString())
        textInputRef.current.focus();
        setSelectedUnit(amountControl.unitMain)
    }

    return (
        <Modal
            onShow={modalShowHandler}
            style={styles.modal}
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModalHandler}>
            <View style={styles.mainModalView}>
                <TouchableOpacity style={styles.dismissModalTouchable} activeOpacity={1} onPress={() => { closeModalHandler('background') }}>
                    <View style={styles.mainCardContainer}>
                        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}>
                            <View>
                                <View style={styles.cardTitleAndDismissIconContainer}>
                                    <Feather name="x" size={normalizeIconSize(25)} onPress={closeModalHandler} style={styles.dismissIcon} />
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
                            <AmountOfGroceriesManager closeModal={closeModalHandler} textInputRef={textInputRef} amount={amount} setAmount={setAmount} 
                            selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} amountControl={amountControl} addToGroceryList={addToGroceryList} />
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
    
})
export default AddToGroceryListModal
