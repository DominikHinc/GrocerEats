import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import DefaultText from '../components/DefaultText'
import GroceryListList from '../components/GroceryListList'
import { AntDesign } from '@expo/vector-icons'
import { normalizeIconSize, normalizeMarginSize, normalizeWidth } from '../methods/normalizeSizes'
import { useSafeArea } from 'react-native-safe-area-context'
import AddNewProductModal from '../components/AddNewProductModal'

const YourGroceryListScreen = (props) => {
    const groceryList = useSelector(state => state.groceryList.productsList);
    const insets = useSafeArea();
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View style={styles.screen}>
            <Logo color={Colors.green} />
            <GroceryListList data={groceryList} />
            <View style={[styles.addNewProductIconContainer, { top: insets.top + normalizeMarginSize(15) }]}>
                <TouchableOpacity style={styles.addNewProductTouchable} onPress={()=>setModalVisible(prev=>!prev)} >
                    <AntDesign name='pluscircle' size={normalizeIconSize(25)} color={Colors.green} />
                </TouchableOpacity>
            </View>
            <AddNewProductModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    addNewProductIconContainer: {
        position: 'absolute',
        right: normalizeMarginSize(14.25),
        width: normalizeWidth(50),
        aspectRatio: 1
    },
    addNewProductTouchable:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default YourGroceryListScreen
