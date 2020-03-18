import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Picker, Image, TouchableWithoutFeedback, Keyboard, LayoutAnimation, KeyboardAvoidingView, Dimensions } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'
import SearchBar from '../components/SearchBar'
import IngredientsList from '../components/IngredientsList'
import FloatingSearchIcon from '../components/FloatingSearchIcon'


const SearchByIngredientsScreen = (props) => {
    const [addBarTextInputValue, setAddBarTextInputValue] = useState('');
    const [recipesList, setRecipesList] = useState([])
    const [ingredientsList, setIngredientsList] = useState([])
    const [wholeScreenHeight, setWholeScreenHeight] = useState(0)
    const CustomLayoutSpring = {
        duration: 300,
        create: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 2,
        },
        update: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 2,
        },
        delete: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 2,
        }

    };

    const addIngredient = () => {
        if (ingredientsList.find(item => addBarTextInputValue === item) === undefined) {
            LayoutAnimation.configureNext(CustomLayoutSpring)
            setIngredientsList(prev => [addBarTextInputValue, ...prev]);
        }
        setAddBarTextInputValue("");
    }

    const removeIngredient = (ingredientName) => {
        setIngredientsList(prev => prev.filter(item => item !== ingredientName))
        LayoutAnimation.configureNext(CustomLayoutSpring);
    }

    const setAddBarText = (text) => {
        setAddBarTextInputValue(text)
    }

    const onLayout = (e)=>{
        // console.log("Screen view layout height: ")
        // console.log(e.nativeEvent.layout.height)
        // console.log("Screen height")
        // console.log(Dimensions.get('screen').height)

        setWholeScreenHeight(e.nativeEvent.layout.height);
    }

    return (
        <View style={styles.screen} onLayout={onLayout}>
            <Logo color={Colors.yellow} />
            <View style={styles.restOfTheScreenContainer}>
                <SearchBar searchBarTextInputValue={addBarTextInputValue} searchBarTextChangedHandler={setAddBarText} onSearchPress={addIngredient}
                    backgroundColor={Colors.yellow} useAddBarPreset={true} placeholder="Add Ingredient" />
                <IngredientsList ingredientsList={ingredientsList} removeIngredient={removeIngredient} />
                {recipesList.length < 1 && <TouchableWithoutFeedback disabled={recipesList.length > 0 ? true : false} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>}
                
            </View>
            {ingredientsList.length > 0 && <FloatingSearchIcon active={true} wholeScreenHeight={wholeScreenHeight} />}
           
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        
       
    },
    restOfTheScreenContainer: {
        flex: 1,
        zIndex: 1,
        backgroundColor: 'white',
        //marginTop: '2%'
    },
})

export default SearchByIngredientsScreen
