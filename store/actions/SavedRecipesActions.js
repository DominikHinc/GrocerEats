export const SAVE_RECIPE = "SAVE_RECIPE";
export const REMOVE_SAVED_RECIPE = "REMOVE_SAVED_RECIPE";
export const SAVED_RECIPE_SCREEN_REFRESHED = 'SAVED_RECIPE_SCREEN_REFRESHED'

export const saveRecipe = (id)=>{
    return{
        type:SAVE_RECIPE,
        id,
    }
}

export const removeSavedRecipe = (id) =>{
    console.log("Remove action")
    return{
        type:REMOVE_SAVED_RECIPE,
        id:id
    }
}

export const savedRecipeScreenRefreshed = ()=>{
    return{
        type:SAVED_RECIPE_SCREEN_REFRESHED
    }
}