import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Animated, Easing, FlatList, Keyboard, PanResponder, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import DefaultText from '../components/DefaultText'
import Logo from '../components/Logo'
import RecipePreview from '../components/RecipePreview'
import { APIKEY_STANDARD_SEARCH } from '../constants/APIKEY'
import Colors from '../constants/Colors'
import { normalizeBorderRadiusSize, normalizePaddingSize, normalizeFontSize, normalizeMarginSize, normalizeIconSize } from '../methods/normalizeSizes'



const StandardSearchScreen = (props) => {
    //UI Related Vriables
    const [searchBarTextInputValue, setSearchBarTextInputValue] = useState('')

    //Fetching Data From Server Related Variables
    const [recipesList, setRecipesList] = useState([])
    const [couldNotFindRecipe, setCouldNotFindRecipe] = useState(false)
    const [shouldDataBeFetchedFromServer, setShouldDataBeFetchedFromServer] = useState(false)
    const [hasFirstLoadOfGivenSearchBeenPerformed, setHasFirstLoadOfGivenSearchBeenPerformed] = useState(false)
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
    
    //Fetching data from server reated methods
    const getResponseFromServer = async () => {
        recipesList.length > 0 ? null : setLoading(true)

        setCouldNotFindRecipe(false);
        let response;
        try {
            response = await fetch(`https://api.spoonacular.com/recipes/search?query=${searchBarTextInputValue}&offset=${recipesFetchOffset}&number=${perLoadAmount}&apiKey=${APIKEY_STANDARD_SEARCH}`)
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
            return;
        }
        let readableResponse;
        try {
            readableResponse = await response.json();
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
            return;
        }
        if (readableResponse.results.length < 1 && hasFirstLoadOfGivenSearchBeenPerformed === false) {
            setCouldNotFindRecipe(true);
            setLoading(false)
            return;
        }
        //console.log(readableResponse.results)
        //If array is shorter then requested amount, there are no more recipes
        readableResponse.results.length < perLoadAmount ? setHasAllRecipesOfGivenSearchBeenFetched(true) : null
        //When first search is performed the whole response.results is assigned to recipes list. Also the first search id is assigned, wchich is later used to avoid looping
        if (hasFirstLoadOfGivenSearchBeenPerformed === false) {
            firstSearchId = readableResponse.results[0].id;
            setRecipesList(readableResponse.results);
            setHasFirstLoadOfGivenSearchBeenPerformed(true)
        } else {
            //Every next search after the first one check if response array conatins item which id is the same as 
            //the Id of the first item, if it is that means the response looped and there are no more unique recipes
            const hasLooped = readableResponse.results.find(item => item.id === firstSearchId)
            if (hasLooped===undefined && recipesFetchOffset < 300) {
                const data = recipesList.concat(readableResponse.results)
                setRecipesList(data);
            } else {
                setHasAllRecipesOfGivenSearchBeenFetched(true);
                console.log("All recipes has been searched")
                return;
            }
        }
        setRecipesFetchOffset(prev => prev + perLoadAmount)
        setLoading(false)
    }

    useEffect(() => {
        //console.log("Has all recipes been fetched: "+hasAllRecipesOfGivenSearchBeenFetched)
        if (shouldDataBeFetchedFromServer && !hasAllRecipesOfGivenSearchBeenFetched) {
            setShouldDataBeFetchedFromServer(false);
            getResponseFromServer();
        }
    }, [shouldDataBeFetchedFromServer])

    const loadMore = () => {
        if (!hasAllRecipesOfGivenSearchBeenFetched) {
            console.log('Load more')
            setShouldDataBeFetchedFromServer(true)
        }

    }

    const searchHandler = () => {
        console.log('Searching');
        setRecipesList([]);
        Keyboard.dismiss();
        setShouldDataBeFetchedFromServer(true);
        setHasAllRecipesOfGivenSearchBeenFetched(false)
        setHasFirstLoadOfGivenSearchBeenPerformed(false)
        setRecipesFetchOffset(0)
        hideLogo()
    }

    //UI Related Methods
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

    //Animation Related Methods and Interpolated Variables
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

    const showLogo = () => {
        Animated.timing(logoAnimationProgress, {
            toValue: 1,
            duration: 150,
            easing: Easing.linear
        }).start()
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
            <Logo onLayout={(e)=>{logoInitialHeight === -1 ? logoInitialHeight = e.nativeEvent.layout.height : null}} color={Colors.blue} logoContainerStyle={{height:logoHeight, opacity: logoOpacity }} />
            <TouchableWithoutFeedback disabled={recipesList.length > 0 ? true : false} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.restOfTheScreenContainer}>
                    <Animated.View style={[styles.searchTextInputAnimatedContainer, { top: searchBarDistanceFromTop }]}>
                        <TouchableOpacity style={{ width: '60%' }} activeOpacity={animationCompleted ? 1 : 0.5} onPressOut={animationCompleted ? null : startAnimationAfterRealase} >
                            <View style={styles.searchTextInputContainer}>
                                <TextInput ref={textInputRef} style={styles.searchTextInput} placeholder="Search"
                                    placeholderTextColor={Colors.lightGray} editable={animationCompleted}
                                    onSubmitEditing={searchHandler} value={searchBarTextInputValue} onChangeText={searchBarTexInputChangedHandler} />
                                <Ionicons style={{paddingRight: normalizePaddingSize(15) }} name="ios-search" size={normalizeIconSize(21)} onPress={animationCompleted ? searchHandler : null} />
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
        flex:1,
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
        margin: normalizeMarginSize(10) ,
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
