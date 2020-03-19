import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import Colors from '../constants/Colors'
import { normalizeMarginSize } from '../methods/normalizeSizes'
import DefaultText from './DefaultText'
import RecipePreview from './RecipePreview'



const MealPreviewList = ({ data, onEndReached, gotDetailedData, noMoreDataToDisplay, navigationProp, endOfListText, renderRecipeSearchedByIngredinets }) => {
    //TODO po co rozbijasz to tu, w data wystarczy dać gotDetailedData ? data.mealDetails : data

    const renderRecipePreviews = ({ item, index }) => {
        if(gotDetailedData ? item = item.mealDetails : item)
    return <RecipePreview onPress={() => { navigationProp.navigate("MealDetails", { id: item.id, color: Colors.blue, gotDetailedData: gotDetailedData }) }}
        title={item.title} id={item.id}
        image={item.imageType === undefined ? item.imageUrls !== undefined ?
                item.imageUrls.length > 1 ? item.imageUrls[item.imageUrls.length - 1] : item.image : item.image : item.imageType}
        readyInMinutes={item.readyInMinutes}
        servings={item.servings}
        savedMealDetailsData={item} />
}
const renderRecipePreviewSearchedByIngredients = ({ item, index }) => {
    //Because the data recieved after searching by ingradients is so diffrent separation was mandarory
    return <RecipePreview onPress={() => { navigationProp.navigate("MealDetails", { id: item.id, color: Colors.blue, gotDetailedData: gotDetailedData }) }}
        title={item.title} id={item.id} image={item.imageType} missedIngredients={item.missedIngredientCount} usedIngredients={item.usedIngredientCount} />
}

    const renderListFooter = () => {
        return noMoreDataToDisplay === false ? <ActivityIndicator size='small' color={Colors.blue} />
            :
            <DefaultText style={{ textAlign: 'center', paddingTop: '5%' }}>{endOfListText === undefined ? "No more recipes found" : endOfListText}</DefaultText>
    }
    console.log("List rerendering")
    return (
        <OptimizedFlatList style={styles.listStyle} keyExtractor={item => item.id.toString()} data={data}
            renderItem={renderRecipeSearchedByIngredinets === true ? renderRecipePreviewSearchedByIngredients : renderRecipePreviews} showsVerticalScrollIndicator={false} ItemSeparatorComponent={(hilighted) => <View style={styles.recipesListItemSeparator} />}
            contentContainerStyle={{ paddingBottom: '3%', paddingTop: '5%' }} scrollEventThrottle={30}
            onEndReachedThreshold={0.1} onEndReached={onEndReached !== undefined ? onEndReached : null}
            ListFooterComponent={renderListFooter} />)
}

const styles = StyleSheet.create({
    recipesListItemSeparator: {
        margin: normalizeMarginSize(10),
        borderTopWidth: 1,
        borderTopColor: Colors.gray
    },
    listStyle: {
        marginHorizontal: '3%',
        // marginTop: '3%',
        flex: 1
    }
})

export default MealPreviewList
