import { SAVE_RECIPE, REMOVE_SAVED_RECIPE, SAVED_RECIPE_SCREEN_REFRESHED } from "../actions/SavedRecipesActions"

const initialState = {
    savedRecipes:[],
    shouldSavedRecipeScreenBeRefreshed:true
}

export default (state = initialState, action) =>{
        switch(action.type){
            case SAVE_RECIPE:
                console.log("Recipe will be saved");
                const isRecipeAlreadySaved = state.savedRecipes.find(item => item.id === action.id);
                return isRecipeAlreadySaved === undefined ? {...state, savedRecipes:[...state.savedRecipes,{id:action.id}], shouldSavedRecipeScreenBeRefreshed:true} : state
            case REMOVE_SAVED_RECIPE:
                console.log('Recipe will be removed');
                const newSavedRecipes = state.savedRecipes.filter(item=>item.id !== action.id)
                return{...state, savedRecipes:newSavedRecipes, shouldSavedRecipeScreenBeRefreshed:true};
            case SAVED_RECIPE_SCREEN_REFRESHED:
                return {...state, shouldSavedRecipeScreenBeRefreshed:false}
            default:
                return state
        }
}