import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import MealPreviewList from '../components/MealPreviewList'
import DefaultText from '../components/DefaultText'
import { fetchSavedRecipesData, ERROR_WHILE_FETCHING, SUCCESS, MAXIMUM_NUMERS_OF_CALLS_REACHED } from '../methods/fetchFromServer'
import { savedRecipeScreenRefreshed } from '../store/actions/SavedRecipesActions'
import { useFocusEffect } from '@react-navigation/native';


const SavedRecipesScreen = (props) => {
    const listOfSavedIds = useSelector(state => state.savedRecipes.savedRecipes);
    const savedListShouldBeRefreshed = useSelector(state => state.savedRecipes.shouldSavedRecipeScreenBeRefreshed)
    const [recipesList, setRecipesList] = useState([])
    const [loading, setLoading] = useState(listOfSavedIds.length > 0 ? true : false)
    const dispatch = useDispatch();
    //const [savedListShouldBeRefreshed, setSavedListShouldBeRefreshed] = useState(true)

    useFocusEffect(()=>{
        if (listOfSavedIds.length > 0 && savedListShouldBeRefreshed === true) {
            //setSavedListShouldBeRefreshed(false)
            dispatch(savedRecipeScreenRefreshed())
            // console.log("Fetching For Saved Recipes Data")
            setLoading(true)
            fetchSavedRecipesData(listOfSavedIds).then(response => {
                switch (response.status) {
                    case ERROR_WHILE_FETCHING:
                        Alert.alert("Something went wrong", response.error)
                        break;
                    case MAXIMUM_NUMERS_OF_CALLS_REACHED:
                        Alert.alert("Something went wrong", response.error)
                        break;
                    //Because there is no way to offset search by ingredinets there is no need to implement case NO_MORE_RECIPES
                    case SUCCESS:
                        setRecipesList(response.response);
                        break;
                }
                setLoading(false)
            }).catch(e => {
                Alert.alert("Something went wrong", e.message)
            })
        }
    },[])

    console.log(savedListShouldBeRefreshed)

    return (
        <View style={styles.screen}>
            <Logo color={Colors.red} shouldLogoBeShown={true} />
            {listOfSavedIds.length < 1 && !loading && recipesList.length < 1 && <View style={styles.zeroSavedRecipesMessageContainer}><DefaultText>You haven't saved any recipes</DefaultText></View>}
            {recipesList.length > 0 && !loading && <MealPreviewList data={recipesList} onEndReached={() => { }} noMoreDataToDisplay={true}
                navigationProp={props.navigation} endOfListText={"That's all recipes you saved. Go and add more."} />}
                {loading && <View style={{flex:1, justifyContent:'center', alignItems:'center'}} ><ActivityIndicator size='large' color={Colors.red} /></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    zeroSavedRecipesMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SavedRecipesScreen
