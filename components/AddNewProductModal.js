import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, Modal, TouchableOpacity, Alert, Keyboard } from 'react-native'
import DefaultText from './DefaultText'
import { normalizeBorderRadiusSize, normalizePaddingSize, normalizeIconSize, normalizeFontSize } from '../methods/normalizeSizes'
import { Feather } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import ProductModel from '../models/ProductModel'
import { addProduct } from '../store/actions/GroceryListActions'


const AddNewProductModal = ({ modalVisible, setModalVisible }) => {

    const [nameTextInputValue, setNameTextInputValue] = useState('')
    const [aisleTextInputValue, setAisleTextInputValue] = useState('')
    const [amountTextInputValue, setAmountTextInputValue] = useState('')
    const [unitTextInputValue, setUnitTextInputValue] = useState('')

    const dispatch = useDispatch()

    const validateChangedNameHandler = (text) => {
        if (text.match(/^[A-Za-z0-9 _]*$/) || text.length === 0) {
            setNameTextInputValue(text)
        }
    }
    const validateChangedAisleHandler = (text) => {
        if (text.match(/^[A-Za-z0-9 _]*$/) || text.length === 0) {
            setAisleTextInputValue(text)
        }
    }
    const validateChangedAmountHandler = (text) => {
        setAmountTextInputValue(text)
    }
    const validateChangedUnitHandler = (text) => {
        if (text.match(/^[A-Za-z0-9 _]*$/) || text.length === 0) {
            setUnitTextInputValue(text)
        }
    }

    const addNewProduct = () => {
        const isValid = amountTextInputValue.match(/^-?\d*(\.\d+)?$/);
        if (isValid) {
            if (nameTextInputValue.length < 1 || amountTextInputValue.length < 1 || aisleTextInputValue.length < 1 || unitTextInputValue.length < 1) {
                Alert.alert("Not every field has been filled", "Please fill every field.")
            } else {
                console.log("Product Will be added")
                dispatch(addProduct(new ProductModel(parseInt(Math.random() * 1000000), nameTextInputValue, null,
                amountTextInputValue, "0", unitTextInputValue, "", aisleTextInputValue, false)))
                setModalVisible(false)
                setNameTextInputValue("")
                setUnitTextInputValue("")
                setAisleTextInputValue("")
                setAmountTextInputValue("")
                Keyboard.dismiss()
            }
        } else {
            Alert.alert("Given Amount Is not a Valid Number", "You can only enter 0-9 characters, with maximum of one dot between them.")
        }
    }

    return (
        <Modal
            contentContainerStyle={styles.modal}
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            transparent={true}
        >
            <View style={styles.mainModalView}>
                <TouchableOpacity style={styles.backgroundDismissTouchable} activeOpacity={1} onPress={() => { setModalVisible(false) }}>
                    <View style={styles.modalUsableView}>
                        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}>
                            <View>
                                <View style={styles.closeModalIconContainer}>
                                    <Feather name="x" size={normalizeIconSize(25)} onPress={() => { setModalVisible(false) }} style={styles.closeModalIcon} />
                                </View>
                                <View style={styles.modalTitleContainer}>
                                    <DefaultText style={styles.modalTitle}>Add New Product To Grocery List</DefaultText>
                                </View>
                                <View style={styles.productNameContainer}>
                                    <DefaultText style={styles.modalText}>Product Name:</DefaultText>
                                    <TextInput style={[styles.productNameInput, styles.textInputStyle]} placeholder="Name" maxLength={36}
                                        value={nameTextInputValue} onChangeText={validateChangedNameHandler} />
                                </View>
                                <View style={styles.productAisleContainer}>
                                    <DefaultText style={styles.modalText}>Aisle Of Product:</DefaultText>
                                    <TextInput style={[styles.productAisleInput, styles.textInputStyle]} placeholder="Aisle" maxLength={30}
                                        value={aisleTextInputValue} onChangeText={validateChangedAisleHandler} />
                                </View>
                                <View style={styles.amountAndUnitContainer}>
                                    <View style={styles.amountContainer}>
                                        <DefaultText style={styles.modalText}>Product Amount:</DefaultText>
                                        <TextInput style={[styles.amountInput, styles.textInputStyle]} placeholder="Amount" maxLength={6}
                                            value={amountTextInputValue} onChangeText={validateChangedAmountHandler} />
                                    </View>
                                    <View style={styles.unitContainer}>
                                        <DefaultText style={styles.modalText}>Unit Of Amount:</DefaultText>
                                        <TextInput style={[styles.unitInput, styles.textInputStyle]} placeholder="Unit" maxLength={12}
                                            value={unitTextInputValue} onChangeText={validateChangedUnitHandler} />
                                    </View>
                                </View>

                                <View style={styles.addButtonContainer}>
                                    <TouchableOpacity style={styles.addButtonTouchable} onPress={addNewProduct}>
                                        <View style={styles.insideOfButton}>
                                            <DefaultText>Add</DefaultText>
                                        </View>
                                    </TouchableOpacity>
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
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    backgroundDismissTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalUsableView: {
        width: '80%',
        aspectRatio: 0.95,
        backgroundColor: 'white',
        borderRadius: normalizeBorderRadiusSize(28),
        elevation: 5
    },
    closeModalIconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: normalizePaddingSize(15),
        paddingTop: normalizePaddingSize(15)
    },
    modalTitleContainer: {
        width: '100%',
        paddingTop: normalizePaddingSize(10)
    },
    modalTitle: {
        fontFamily: 'sofia-bold',
        fontSize: 20,
        textAlign: 'center'
    },
    textInputStyle: {
        fontSize: normalizeFontSize(15),
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray
    },
    modalText: {
        textAlign: 'center',
        fontFamily: 'sofia-med'
    },
    productNameContainer: {
        paddingVertical: normalizePaddingSize(10)
    },
    productNameInput: {
        width: '80%',
        alignSelf: 'center'
    },
    productAisleContainer: {
        paddingVertical: normalizePaddingSize(10)
    },
    productAisleInput: {
        width: '80%',
        alignSelf: 'center'
    },
    amountAndUnitContainer: {
        flexDirection: 'row',
        paddingVertical: normalizePaddingSize(10)
    },
    amountContainer: {
        flex: 0.5
    },
    amountInput: {
        width: '50%',
        alignSelf: 'center',
        textAlign: 'center'
    },
    unitContainer: {
        flex: 0.5
    },
    unitInput: {
        width: '50%',
        alignSelf: 'center',
        textAlign: 'center'
    },
    addButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: normalizePaddingSize(15),
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },
    addButtonTouchable: {
        backgroundColor: 'white',
        width: '25%',
        aspectRatio: 1.9,
        borderRadius: normalizeBorderRadiusSize(10),
        elevation: 2,
    },
    insideOfButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})

export default AddNewProductModal
