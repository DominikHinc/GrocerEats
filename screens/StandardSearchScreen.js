import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Animated, StyleSheet, View, TouchableOpacity, Easing, Keyboard, TextInput, TouchableWithoutFeedback, Alert, FlatList, ActivityIndicator, PanResponder, ScrollView } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'
import { APIKEY_STANDARD_SEARCH } from '../constants/APIKEY'
import RecipePreview from '../components/RecipePreview'
import { useSafeArea } from 'react-native-safe-area-context'
import DefaultText from '../components/DefaultText'
import AnimatedHeader from 'react-native-animated-header';



const HEADER_EXPANDED_HEIGHT = 100
const HEADER_COLLAPSED_HEIGHT = 0

const StandardSearchScreen = (props) => {
    const sizeAndOpacityAnimationValue = new Animated.Value(1);
    const distanceFromTopAnimationValue = new Animated.Value(1);

    const [animationCompleted, setAnimationCompleted] = useState(false)
    const [searchBarTextInputValue, setSearchBarTextInputValue] = useState('')
    const [fetchFromServer, setFetchFromServer] = useState(false)
    const [recipesList, setRecipesList] = useState(false)
    const [loading, setLoading] = useState(false)
    const [couldNotFindRecipe, setCouldNotFindRecipe] = useState(false)
    const [logoAnimationProgress, setLogoAnimationProgress] = useState(new Animated.Value(1))
    const [currentLogoMargin, setCurrentLogoMargin] = useState(0)
    const currentListOffset = useRef(0)
    const insets = useSafeArea();
    let canListScroll = useRef(false).current
    const textInputRef = useRef()
    const getResponseFromServer = async () => {
        setLoading(true)
        setCouldNotFindRecipe(false);
        let response;
        try {
            response = await fetch(`https://api.spoonacular.com/recipes/search?query=${searchBarTextInputValue}&number=25&apiKey=${APIKEY_STANDARD_SEARCH}`)
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
        setRecipesList(readableResponse.results);
        setLoading(false)
        if (readableResponse.results.length < 1) {
            setCouldNotFindRecipe(true);
        }
        console.log(readableResponse.results)
    }

    useEffect(() => {
        if (fetchFromServer) {
            setFetchFromServer(false);
            getResponseFromServer();
        }
    }, [fetchFromServer])

    

    const searchBarDistanceFromTop = distanceFromTopAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '45%']
    })

    const logoHeight = logoAnimationProgress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '12%']
    })
    const logoOpacity = logoAnimationProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const searchHandler = () => {
        console.log('Searching');
        Keyboard.dismiss();
        setFetchFromServer(true);
        hideLogo()
    }

    const searchBarTexInputChangedHandler = (text) => {
        setSearchBarTextInputValue(text)
    }
    
    const position = useRef(new Animated.ValueXY()).current;
    const panResponder = React.useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onShouldBlockNativeResponder: () => false,
        onPanResponderMove: (evt, gestureState) => {
            console.log(position.y._value )
            canListScroll = position.y._value < -100 ? true : false
            console.log(canListScroll)
            position.setValue({ x: gestureState.dx, y: gestureState.dy });


        },
        onPanResponderRelease: (evt, gestureState) => { },
    }), []);

    const headerSize = position.y.interpolate({
        inputRange: [-100, 0],
        outputRange: ['0%', '12%'],
        extrapolate: 'clamp'
    })

    


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


    const onScrollHandler = (e) => {
        //console.log(e.nativeEvent.velocity.y)
        // if (e.nativeEvent.contentOffset.y > 50) {
        //     hideLogo()
        // }
        // console.log(e.nativeEvent.contentOffset.y)
        // if (Math.abs(e.nativeEvent.contentOffset.y - currentListOffset.current) > 15) {
        //     if (e.nativeEvent.contentOffset.y > currentListOffset.current) {
        //         //Logo should disappear
        //         hideLogo()
        //     } else if (e.nativeEvent.contentOffset.y < currentListOffset.current) {
        //         //Logo should apperar
        //         showLogo()
        //     }
        // }

        //setCurrentListOffset(e.nativeEvent.contentOffset.y)
        // currentListOffset.current = e.nativeEvent.contentOffset.y;
        // console.log(currentLogoMargin)
    }
    const onMomentumStopHandler = (e) => {
        // if (e.nativeEvent.contentOffset.y === 0) {
        //     showLogo()
        // }
    }
    const navigateToMealDetailsScreen = (id)=>{
        props.navigation.navigate("MealDetails",{id:id, color:Colors.blue})
    }
    const renderRecipePreviews = ({ item, index }) => {
        return <RecipePreview onPress={()=>{navigateToMealDetailsScreen(item.id)}} title={item.title} id={item.id} image={item.imageUrls.length > 1 ? item.imageUrls[item.imageUrls.length - 1] : item.image} readyInMinutes={item.readyInMinutes} servings={item.servings} />
    }

    
    return (
        <View style={styles.screen} >
            <Logo color={Colors.blue} logoContainerStyle={{ height: logoHeight}} />
            <TouchableWithoutFeedback disabled={recipesList ? true : false} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.restOfTheScreenContainer}>
                    <Animated.View style={[styles.searchTextInputAnimatedContainer, { top: searchBarDistanceFromTop }]}>
                        <TouchableOpacity style={{ width: '60%' }} activeOpacity={animationCompleted ? 1 : 0.5} onPressOut={animationCompleted ? null : startAnimationAfterRealase} >
                            <View style={styles.searchTextInputContainer}>
                                <TextInput ref={textInputRef} style={styles.searchTextInput} placeholder="Search"
                                    placeholderTextColor={Colors.lightGray} editable={animationCompleted}
                                    onSubmitEditing={searchHandler} value={searchBarTextInputValue} onChangeText={searchBarTexInputChangedHandler} />
                                <Ionicons name="ios-search" size={22} onPress={animationCompleted ? searchHandler : null} />
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                    {recipesList && !couldNotFindRecipe && !loading && <Animated.View  style={{ flex: 1 }}><FlatList style={styles.listStyle} keyExtractor={item => item.id.toString()} data={recipesList}
                        renderItem={renderRecipePreviews} showsVerticalScrollIndicator={false} ItemSeparatorComponent={(hilighted) => <View style={styles.recipesListItemSeparator} />}
                        contentContainerStyle={{ paddingBottom: '3%' }} onScroll={onScrollHandler} onMomentumScrollEnd={onMomentumStopHandler} scrollEventThrottle={30}/></Animated.View>}
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
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',

    },
    searchTextInput: {
        width: '80%',
        marginLeft: '5%',
        borderRadius: 15,
        paddingHorizontal: 15,
        fontFamily: 'sofia',
        fontSize: 16,
        paddingVertical: 3
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
        margin: 10,
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
