import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Animated, Easing, FlatList, Keyboard, PanResponder, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import DefaultText from '../components/DefaultText'
import Logo from '../components/Logo'
import RecipePreview from '../components/RecipePreview'
import { APIKEY_STANDARD_SEARCH } from '../constants/APIKEY'
import Colors from '../constants/Colors'
import { normalizeBorderRadiusSize, normalizePaddingSize, normalizeFontSize, normalizeMarginSize, normalizeIconSize } from '../methods/normalizeSizes'
import { fetchStandardSearchFromServer, RECIPE_COULD_NOT_BE_FOUND, ERROR_WHILE_FETCHING, NO_MORE_RECIPES, SUCCESS } from '../methods/fetchStandardSearchFromServer'


const StandardSearchScreen = (props) => {
    //UI Related Vriables
    const [searchBarTextInputValue, setSearchBarTextInputValue] = useState('')

    //Fetching Data From Server Related Variables
    const [recipesList, setRecipesList] = useState([])
    const [couldNotFindRecipe, setCouldNotFindRecipe] = useState(false)
    const [shouldDataBeFetchedFromServer, setShouldDataBeFetchedFromServer] = useState(false)
    const [hasAllRecipesOfGivenSearchBeenFetched, setHasAllRecipesOfGivenSearchBeenFetched] = useState(false)
    const [recipesFetchOffset, setRecipesFetchOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    let firstSearchId = useRef().current;
    const perLoadAmount = 25;

    //Animation Realted Variables
    const distanceFromTopAnimationValue = new Animated.Value(1);
    const [animationCompleted, setAnimationCompleted] = useState(false)
    const textInputRef = useRef()
    const [logoAnimationProgress, setLogoAnimationProgress] = useState(new Animated.Value(1))
    let logoInitialHeight = useRef(-1).current;

    //Fetching data from server related functions

    useEffect(() => {
        if (shouldDataBeFetchedFromServer && !hasAllRecipesOfGivenSearchBeenFetched) {
            setShouldDataBeFetchedFromServer(false);
            recipesList.length > 0 ? null : setLoading(true)
            setCouldNotFindRecipe(false);
            fetchStandardSearchFromServer(searchBarTextInputValue,recipesList.length, recipesFetchOffset, firstSearchId, perLoadAmount).then((response) => {
                switch (response.status) {
                    case RECIPE_COULD_NOT_BE_FOUND:
                        setCouldNotFindRecipe(true);
                        break;
                    case ERROR_WHILE_FETCHING:
                        Alert.alert("Something went wrong", response.error.message)
                        break;
                    case NO_MORE_RECIPES:
                        setHasAllRecipesOfGivenSearchBeenFetched(true);
                    case SUCCESS:
                        if(response.firstSearchId !== undefined){
                            firstSearchId = response.firstSearchId;
                        }
                        const data = recipesList.concat(response.response)
                        setRecipesList(data);
                        break;
                }
                setLoading(false);
                setRecipesFetchOffset(prev => prev + perLoadAmount)
            }).catch(error => Alert.alert("Something Went wrong", error.message))

        }
    }, [shouldDataBeFetchedFromServer])

    const loadMore = () => {
        if (!hasAllRecipesOfGivenSearchBeenFetched) {
            //console.log('Load more')
            setShouldDataBeFetchedFromServer(true)
        }

    }

    const searchHandler = () => {
        //console.log('Searching');
        setRecipesList([]);
        Keyboard.dismiss();
        setShouldDataBeFetchedFromServer(true);
        setHasAllRecipesOfGivenSearchBeenFetched(false)
        setRecipesFetchOffset(0)
        hideLogo()
    }

    //UI Related Functions
    const searchBarTexInputChangedHandler = (text) => {
        setSearchBarTextInputValue(text)
    }
    const navigateToMealDetailsScreen = (id) => {
        props.navigation.navigate("MealDetails", { id: id, color: Colors.blue })
    }
    const renderRecipePreviews = ({ item, index }) => {
        return <RecipePreview onPress={() => { navigateToMealDetailsScreen(item.id) }} title={item.title} id={item.id} image={item.imageUrls.length > 1 ? item.imageUrls[item.imageUrls.length - 1] : item.image} readyInMinutes={item.readyInMinutes} servings={item.servings} />
    }

    const renderListFooter = () => {
        return hasAllRecipesOfGivenSearchBeenFetched === false ? <ActivityIndicator size='small' color={Colors.blue} /> : <DefaultText style={{ textAlign: 'center' }}>No more recipes found</DefaultText>
    }

    //Animation Related Functions and Interpolated Variables
    const startAnimationAfterRealase = () => {
        Animated.timing(distanceFromTopAnimationValue, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,

        }).start(() => {
            setAnimationCompleted(true);
            textInputRef.current.focus();
        })
    }


    const hideLogo = () => {
        Animated.timing(logoAnimationProgress, {
            toValue: 0,
            duration: 150,
            easing: Easing.linear
        }).start()
    }

    const searchBarDistanceFromTop = distanceFromTopAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '45%']
    })

    const logoHeight = logoAnimationProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, logoInitialHeight],
    })
    const logoOpacity = logoAnimationProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    return (
        <View style={styles.screen} >
            <Logo onLayout={(e) => { logoInitialHeight === -1 ? logoInitialHeight = e.nativeEvent.layout.height : null }} color={Colors.blue} logoContainerStyle={{ height: logoHeight, opacity: logoOpacity }} />
            <TouchableWithoutFeedback disabled={recipesList.length > 0 ? true : false} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.restOfTheScreenContainer}>
                    <Animated.View style={[styles.searchTextInputAnimatedContainer, { top: searchBarDistanceFromTop }]}>
                        <TouchableOpacity style={{ width: '60%' }} activeOpacity={animationCompleted ? 1 : 0.5} onPressOut={animationCompleted ? null : startAnimationAfterRealase} >
                            <View style={styles.searchTextInputContainer}>
                                <TextInput ref={textInputRef} style={styles.searchTextInput} placeholder="Search"
                                    placeholderTextColor={Colors.lightGray} editable={animationCompleted}
                                    onSubmitEditing={searchHandler} value={searchBarTextInputValue} onChangeText={searchBarTexInputChangedHandler} />
                                <Ionicons style={{ paddingRight: normalizePaddingSize(15) }} name="ios-search" size={normalizeIconSize(21)} onPress={animationCompleted ? searchHandler : null} />
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                    {recipesList.length > 0 && !couldNotFindRecipe && !loading && <Animated.View style={{ flex: 1 }}><FlatList style={styles.listStyle} keyExtractor={item => item.id.toString()} data={recipesList}
                        renderItem={renderRecipePreviews} showsVerticalScrollIndicator={false} ItemSeparatorComponent={(hilighted) => <View style={styles.recipesListItemSeparator} />}
                        contentContainerStyle={{ paddingBottom: '3%' }} scrollEventThrottle={30}
                        onEndReachedThreshold={0.1} onEndReached={loadMore}
                        ListFooterComponent={renderListFooter} /></Animated.View>}
                    {loading && <View style={styles.loadingContainer}><ActivityIndicator size='large' color={Colors.blue} /></View>}
                    {couldNotFindRecipe && <View style={styles.loadingContainer}><DefaultText style={styles.errorText}>Could not find any recipes</DefaultText></View>}

                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    restOfTheScreenContainer: {
        flex: 1,
        zIndex: 1,
        backgroundColor: 'white',
        marginTop: '2%'
    },
    searchTextInputAnimatedContainer: {
        alignItems: 'center',

    },
    searchTextInputContainer: {
        width: '100%',
        backgroundColor: Colors.blue,
        borderRadius: normalizeBorderRadiusSize(15),
        flexDirection: 'row',
        alignItems: 'center',

    },
    searchTextInput: {
        //width: '80%',
        flex: 1,
        marginLeft: '5%',
        borderRadius: normalizeBorderRadiusSize(15),
        paddingHorizontal: normalizePaddingSize(15),
        fontFamily: 'sofia',
        fontSize: normalizeFontSize(18),
        paddingVertical: normalizePaddingSize(3)
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    errorText: {
        textAlign: 'center',

    },
    recipesListItemSeparator: {
        margin: normalizeMarginSize(10),
        borderTopWidth: 1,
        borderTopColor: Colors.gray
    },
    listStyle: {
        marginHorizontal: '3%',
        marginTop: '3%',
        flex: 1
    }
})

export default StandardSearchScreen
