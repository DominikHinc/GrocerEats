import {APIKEY_STANDARD_SEARCH} from '../constants/APIKEY'
export const RECIPE_COULD_NOT_BE_FOUND = 'RECIPE_COULD_NOT_BE_FOUND';
export const ERROR_WHILE_FETCHING = 'ERROR_WHILE_FETCHING'
export const NO_MORE_RECIPES = "NO_MORE_RECIPES"
export const SUCCESS = 'SUCCESS'



export const fetchStandardSearchFromServer = async (searchText,currentListLength, currentOffset, firstIdOfSearch, perLoadAmount) => {
    let response;
   
    try {
        response = await fetch(`https://api.spoonacular.com/recipes/search?query=${searchText}&offset=${currentOffset}&number=${perLoadAmount}&apiKey=${APIKEY_STANDARD_SEARCH}`)
    } catch (error) {
        return {status:ERROR_WHILE_FETCHING, error:error};
    }
    let readableResponse;
    try {
        readableResponse = await response.json();
    } catch (error) {
        return {status:ERROR_WHILE_FETCHING , error:error};
    }

    if (readableResponse.results.length < 1 && currentListLength < 1) {
        setCouldNotFindRecipe(true);
        setLoading(false)
        return {status:RECIPE_COULD_NOT_BE_FOUND};
    }
    //When first search is performed the whole response.results is assigned to recipes list. Also the first search id is assigned, wchich is later used to avoid looping
    if (currentListLength < 1) {
        return {status:readableResponse.results.length < perLoadAmount ? NO_MORE_RECIPES : SUCCESS, response:readableResponse.results, firstSearchId:readableResponse.results[0].id}
    } else {
        //Every next search after the first one check if response array conatins item which id is the same as 
        //the Id of the first item, if it is that means the response looped and there are no more unique recipes
        const hasLooped = readableResponse.results.find(item => item.id === firstIdOfSearch)
        if (hasLooped===undefined && currentOffset < 300) {
            return {status:readableResponse.results.length < perLoadAmount ? NO_MORE_RECIPES : SUCCESS, response:readableResponse.results}
        } else {
            return {status:NO_MORE_RECIPES, response:[]}
        }
    }
}