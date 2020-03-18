export const SAVE_RECIPE = "SAVE_RECIPE";
export const REMOVE_SAVED_RECIPE = "REMOVE_SAVED_RECIPE";

export const saveRecipe = (id, mealDetails)=>{
    return{
        type:SAVE_RECIPE,
        id,
        mealDetails
    }
}

export const removeSavedRecipe = (id) =>{
    console.log("Remove action")
    return{
        type:REMOVE_SAVED_RECIPE,
        id:id
    }
}