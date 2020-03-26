import { insertSavedRecipe, fetchSavedRecipes, deleteSavedRecipe } from "../../helpers/db";
import { fetchMealDetailsFromServer, SUCCESS } from "../../methods/fetchFromServer";
import { Alert } from "react-native";

export const SAVE_RECIPE = "SAVE_RECIPE";
export const REMOVE_SAVED_RECIPE = "REMOVE_SAVED_RECIPE";
export const LOAD_SAVED_RECIPES = 'LOAD_SAVED_RECIPES'

export const saveRecipe = (id, mealDetails) => {
    return async dispatch => {
        try {
            if (mealDetails === undefined) {
                const fetchedDetails = await fetchMealDetailsFromServer(id);
                if (fetchedDetails.status === SUCCESS) {
                    mealDetails = fetchedDetails.response
                } else {
                    throw new Error("Error while fetching data from server");
                }
            }
            const mealDetailsStr = JSON.stringify(mealDetails);
            const dbResault = await insertSavedRecipe(id, mealDetailsStr)
            console.log(dbResault)
            dispatch({ type: SAVE_RECIPE, id, mealDetails })
        } catch (error) {
            // console.log(error)
            // Alert.alert("Something went wrong.", error.message)
            Alert.alert("Something went wrong.", "Error while saving recipe")
        }

    }
}

export const removeSavedRecipe = (id) => {
    console.log("Remove action")
    return async dispatch => {
        try {

            const dbResault = await deleteSavedRecipe(id);
            console.log(dbResault)
            dispatch({ type: REMOVE_SAVED_RECIPE, id: id })
        } catch (error) {
            // throw error
            Alert.alert("Something went wrong.", "Error while removing saved recipe")
        }



    }
}

export const loadSavedRecipes = () => {
    return async dispatch => {

        try {
            const dbResault = await fetchSavedRecipes()
            // console.log(dbResault)
            const mappedArray = dbResault.rows._array.map(item => {
                const parsedDetails = JSON.parse(item.mealDetails)
                return { id: item.mealId, mealDetails: parsedDetails }
            })
            // console.log(mappedArray)
            dispatch({ type: LOAD_SAVED_RECIPES, data: mappedArray })
        } catch (error) {
            // throw error
            Alert.alert("Something went wrong.", 'Error while loading saved recipes')
        }

    }
}

