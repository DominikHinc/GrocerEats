import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Modal } from 'react-native-paper'
import DefaultText from './DefaultText'
import { normalizeBorderRadiusSize } from '../methods/normalizeSizes'

const AddNewProductModal = ({ modalVisible, setModalVisible }) => {
    return (
        <Modal
            contentContainerStyle={styles.modal}
            visible={modalVisible}
            onDismiss={()=>setModalVisible(false)}
        >
            <View style={styles.mainModalView}>
                <View style={styles.modalUsableView}>
                    

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {

    },
    mainModalView: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    modalUsableView: {
        width: '80%',
        aspectRatio: 0.9,
        backgroundColor: 'white',
        borderRadius: normalizeBorderRadiusSize(28),
        
    }
})

export default AddNewProductModal
