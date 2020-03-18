import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet,SafeAreaView } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import MealPreviewList from '../components/MealPreviewList'
import DefaultText from '../components/DefaultText'


const SavedRecipesScreen = (props) => {
    const recipesList = useSelector(state=>state.savedRecipes.savedRecipes);

    return (
        <View style={styles.screen}>
            <Logo color={Colors.red} shouldLogoBeShown={true} />
            {recipesList.length < 1 && <View style={styles.zeroSavedRecipesMessageContainer}><DefaultText>You haven't saved any recipes</DefaultText></View>}
            {recipesList.length > 0 && <MealPreviewList data={recipesList} onEndReached={()=>{}} gotDetailedData={true} noMoreDataToDisplay={true} 
            navigationProp={props.navigation} endOfListText={"That's all recipes you saved. Go and add more."}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white'
    },
    zeroSavedRecipesMessageContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default SavedRecipesScreen
