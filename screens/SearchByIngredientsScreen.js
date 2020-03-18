import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Picker, Image, TouchableWithoutFeedback, Keyboard, LayoutAnimation, KeyboardAvoidingView, Dimensions, Alert, ActivityIndicator } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'
import SearchBar from '../components/SearchBar'
import IngredientsList from '../components/IngredientsList'
import FloatingSearchIcon from '../components/FloatingSearchIcon'
import { fetchSearchByIngredientsFromServer, NO_MORE_RECIPES, RECIPE_COULD_NOT_BE_FOUND, SUCCESS, MAXIMUM_NUMERS_OF_CALLS_REACHED, ERROR_WHILE_FETCHING } from '../methods/fetchFromServer'
import MealPreviewList from '../components/MealPreviewList'
import DefaultText from '../components/DefaultText'


const SearchByIngredientsScreen = (props) => {
    const [addBarTextInputValue, setAddBarTextInputValue] = useState('');
    const [recipesList, setRecipesList] = useState([])
    const [ingredientsList, setIngredientsList] = useState([])
    const [shouldDataBeFetchedFromServer, setShouldDataBeFetchedFromServer] = useState(false)
    const [couldNotFindRecipe, setCouldNotFindRecipe] = useState(false)
    const [recipesFetchOffset, setRecipesFetchOffset] = useState(0)
    const [hasAllRecipesOfGivenSearchBeenFetched, setHasAllRecipesOfGivenSearchBeenFetched] = useState(false)
    const [loading, setLoading] = useState(false)
    let firstSearchId = useRef().current;
    const perLoadAmount = 25;

    const [shouldLogoBeShown, setShouldLogoBeShown] = useState(true)

    const [isKeyboardDisplayed, setIsKeyboardDisplayed] = useState(false)


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

    useEffect(() => {
        if (shouldDataBeFetchedFromServer === true) {
            recipesList.length > 0 ? null : setLoading(true)
            setShouldDataBeFetchedFromServer(false);
            setCouldNotFindRecipe(false);
            fetchSearchByIngredientsFromServer(ingredientsList, recipesList.length, recipesFetchOffset, firstSearchId, perLoadAmount).then(response => {
                switch (response.status) {
                    case RECIPE_COULD_NOT_BE_FOUND:
                        setCouldNotFindRecipe(true);
                        break;
                    case ERROR_WHILE_FETCHING:
                        Alert.alert("Something went wrong", response.error)
                        break;
                    case MAXIMUM_NUMERS_OF_CALLS_REACHED:
                        Alert.alert("Something went wrong", response.error)
                        break;
                    case NO_MORE_RECIPES:
                        setHasAllRecipesOfGivenSearchBeenFetched(true);
                    case SUCCESS:
                        if (response.firstSearchId !== undefined) {
                            firstSearchId = response.firstSearchId;
                        }
                        const data = recipesList.concat(response.response)
                        
                        setRecipesList(data);
                        break;
                }
                setLoading(false)
            }).catch(e => {
                Alert.alert("Something went wrong", e.message)
            })
        }
    }, [shouldDataBeFetchedFromServer])

    const addIngredient = () => {
        if (ingredientsList.find(item => addBarTextInputValue === item) === undefined && addBarTextInputValue.includes("&") === false && addBarTextInputValue.length > 0) {
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

    const searchHander = () => {
        console.log("Searching")
        addIngredient();
        setRecipesList([]);
        Keyboard.dismiss();
        setShouldDataBeFetchedFromServer(true);
        setHasAllRecipesOfGivenSearchBeenFetched(false)
        setRecipesFetchOffset(0)
        setShouldLogoBeShown(false)
    }


    return (
        <View style={styles.screen}>

            <Logo color={Colors.yellow} shouldLogoBeShown={shouldLogoBeShown} />
            <View style={styles.restOfTheScreenContainer}>
                <SearchBar searchBarTextInputValue={addBarTextInputValue} searchBarTextChangedHandler={setAddBarText} onSearchPress={addIngredient}
                    backgroundColor={Colors.yellow} useAddBarPreset={true} placeholder="Add Ingredient" hintText="Search Recipes By Ingradients"
                    onFocus={() => { setIsKeyboardDisplayed(true) }} onBlur={() => { setIsKeyboardDisplayed(false) }} />
                {ingredientsList.length > 0 && <IngredientsList ingredientsList={ingredientsList} removeIngredient={removeIngredient} />}

                {recipesList.length > 0 && !couldNotFindRecipe && !loading && <MealPreviewList data={recipesList}
                    gotDetailedData={false} navigationProp={props.navigation} renderRecipeSearchedByIngredinets={true} />}

                {recipesList.length < 1 && !loading && !couldNotFindRecipe && <TouchableWithoutFeedback disabled={recipesList.length > 0 ? true : false} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>}

                {loading && <View style={styles.loadingContainer}><ActivityIndicator size='large' color={Colors.yellow} /></View>}

                {couldNotFindRecipe && <View style={styles.loadingContainer}><DefaultText style={styles.errorText}>Could not find any recipes</DefaultText></View>}

            </View>
            <KeyboardAvoidingView style={{ position:'absolute', height:"100%",width:"100%", backgroundColor:'transparent', zIndex:2 }} behavior='height' enabled={isKeyboardDisplayed}
            pointerEvents="box-none" >
                {ingredientsList.length > 0 && <FloatingSearchIcon onPress={searchHander} />}
            </KeyboardAvoidingView>


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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
})

export default SearchByIngredientsScreen
