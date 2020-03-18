import React from 'react'
import { View, Text, StyleSheet, Animated, FlatList, ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors'
import { normalizeMarginSize } from '../methods/normalizeSizes'
import RecipePreview from './RecipePreview'
import DefaultText from './DefaultText'
import { useSelector } from 'react-redux'

const MealPreviewList = ({ data, onEndReached, gotDetailedData, noMoreDataToDisplay, navigationProp, endOfListText, renderRecipeSearchedByIngredinets }) => {
    //TODO po co rozbijasz to tu, w data wystarczy dać gotDetailedData ? data.mealDetails : data
    const renderRecipePreviews = ({ item, index }) => {
        return <RecipePreview onPress={() => { navigationProp.navigate("MealDetails", { id: item.id, color: Colors.blue, gotDetailedData: gotDetailedData }) }}
            title={gotDetailedData ? item.mealDetails.title : item.title} id={item.id}
            image={gotDetailedData ?
                item.mealDetails.imageType
                :
                item.imageUrls !== undefined ?
                    item.imageUrls.length > 1 ? item.imageUrls[item.imageUrls.length - 1] : item.image : item.image}
            readyInMinutes={gotDetailedData ? item.mealDetails.readyInMinutes : item.readyInMinutes}
            servings={gotDetailedData ? item.mealDetails.servings : item.servings}
            savedMealDetailsData={gotDetailedData ? item.mealDetails : null} />
    }
    const renderRecipePreviewSearchedByIngredients = ({ item, index }) => {
        return <RecipePreview onPress={() => { navigationProp.navigate("MealDetails", { id: item.id, color: Colors.blue, gotDetailedData: gotDetailedData }) }}
        title={item.title} id={item.id} image={item.imageType}  />
    }

    const renderListFooter = () => {
        return noMoreDataToDisplay === false ? <ActivityIndicator size='small' color={Colors.blue} />
            :
            <DefaultText style={{ textAlign: 'center', paddingTop: '5%' }}>{endOfListText === undefined ? "No more recipes found" : endOfListText}</DefaultText>
    }
    return (
        <Animated.View style={{ flex: 1 }}><FlatList style={styles.listStyle} keyExtractor={item => item.id.toString()} data={data}
            renderItem={renderRecipeSearchedByIngredinets === true ? renderRecipePreviewSearchedByIngredients : renderRecipePreviews} showsVerticalScrollIndicator={false} ItemSeparatorComponent={(hilighted) => <View style={styles.recipesListItemSeparator} />}
            contentContainerStyle={{ paddingBottom: '3%', paddingTop: '5%' }} scrollEventThrottle={30}
            onEndReachedThreshold={0.1} onEndReached={onEndReached !== undefined ? onEndReached : null}
            ListFooterComponent={renderListFooter} /></Animated.View>
    )
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
