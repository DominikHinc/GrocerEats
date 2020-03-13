import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Alert, ImageBackground, Image, Dimensions, Animated } from 'react-native'
import Logo from '../components/Logo'
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { APIKEY_DETAILS_1, gettingAPIKEYfailed, getAPIKEYforDetails } from '../constants/APIKEY';
import GoBackArrow from '../components/GoBackArrow';
import { Ionicons, SimpleLineIcons, AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';
import { calculateTimeColor, calculateServingsColor, calculateHearthColor, calculateStarColor } from '../methods/calculateColors';
import { changeMinutesToHoursAndMinutes } from '../methods/mathHelper';
import SwipableCard from '../components/SwipableCard';

const SCROLLING_TAB_BORDER_RADIUS = 30

const MealDetailsScreen = (props) => {
    const { color, id } = props.route.params;
    const [loading, setLoading] = useState(true)
    const [mealDetails, setMealDetails] = useState(false)
    const [upArrowType, setUpArrowType] = useState('arrow-up')
    const [scrollable, setScrollable] = useState(true)
    const currentContentOffset = new Animated.Value(0)
    let currentApiKey = useRef(1).current

    const fetchMealDataFromServer = async (apiNumber) => {
        setLoading(true)
        let response;
        let readableResponse;
        try {
            console.log('Using APIKEY: ' + getAPIKEYforDetails(currentApiKey))
            response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${getAPIKEYforDetails(currentApiKey)}`)
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
            return;
        }
        try {
            readableResponse = await response.json();
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
            return;
        }
        //console.log(readableResponse)
        if (readableResponse.code === 402 || readableResponse.status === "failure") {
            if (currentApiKey === 10) {
                Alert.alert("Something went wrong", "Maximum number of calls has been reached")
            } else {
                currentApiKey += 1;
                fetchMealDataFromServer()
            }
        }

        setMealDetails(readableResponse)
        setLoading(false)
    }

    useEffect(() => {
        if (mealDetails === false) {
            fetchMealDataFromServer();
        }
    }, [])

    const onScrollHandler = (e) => {
        //const contentOffset = e.nativeEvent.contentOffset.y;
        currentContentOffset.setValue(e.nativeEvent.contentOffset.y);
        setUpArrowType('minus');
        //console.log(e.nativeEvent.contentOffset.y);


    }
    const onMomentumEndHandler = (e) => {
        //const contentOffset = e.nativeEvent.contentOffset.y;
        currentContentOffset.setValue(e.nativeEvent.contentOffset.y);
        setUpArrowType('arrow-up')
        //console.log(e.nativeEvent.contentOffset.y);
        //contentOffset === 0 ? setUpArrowType('arrow-up') : setUpArrowType('arrow-down');
    }

    const imageOpacity = currentContentOffset.interpolate({
        inputRange: [0, Dimensions.get('screen').height / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })
    const imageHeight = currentContentOffset.interpolate({
        inputRange: [0, Dimensions.get('screen').height / 2],
        outputRange: [Dimensions.get('screen').height / 2 + SCROLLING_TAB_BORDER_RADIUS, Dimensions.get('screen').height / 6],
        extrapolate: 'clamp'
    })

    const renderTags = () => {
        if (mealDetails.dishTypes) {
            return mealDetails.dishTypes.map((item, index) => index < 3 ? <View style={styles.tagContainer} key={index}><DefaultText style={styles.tagLabel}>{item}</DefaultText></View> : null)
        } else {
            return;
        }
    }

    const setScrolling = (canScroll) => {
        setScrollable(canScroll);
    }

    const renderIngredients = () => {
        if (mealDetails.extendedIngredients) {
            let ingredientsMap = {};
            return mealDetails.extendedIngredients.map((item, index) => {
                if (ingredientsMap[item.id] === 1) {
                    return null;
                }

                ingredientsMap[item.id] = 1
                return (
                    <SwipableCard key={item.id} item={item} setScrolling={setScrolling} />
                )
            })
        }
    }

    return (
        <View style={{ ...styles.screen, backgroundColor: loading ? 'white' : 'black' }}>
            <GoBackArrow goBack={() => { props.navigation.goBack() }} />
            <Animated.Image source={{ uri: `https://spoonacular.com/recipeImages/${id}-636x393.${mealDetails.imageType}` }} style={[styles.backgroundImage, { opacity: imageOpacity, height: imageHeight }]} resizeMode='cover' />

            {!loading && <ScrollView scrollEnabled={scrollable} style={styles.mainScrollView} onScroll={onScrollHandler} onMomentumScrollEnd={onMomentumEndHandler} showsVerticalScrollIndicator={false}>
                <View style={styles.spaceFiller} />
                <View style={styles.mainContainer}>
                    <View style={styles.upArrowContainer}>
                        {upArrowType === 'minus' ? <AntDesign name='minus' size={28} color={Colors.gray} style={{ ...styles.upArrow, transform: [{ scaleX: 2 }] }} />
                            :
                            <SimpleLineIcons name={upArrowType} size={23} color={Colors.gray} style={styles.upArrow} />}
                    </View>
                    <View style={styles.titleContainer}>
                        <DefaultText style={styles.title}>{mealDetails.title}</DefaultText>
                    </View>
                    <View style={styles.simpleInfoContainer}>
                        <View style={styles.simpleInfo}>
                            <AntDesign name="clockcircleo" color={calculateTimeColor(mealDetails.readyInMinutes)} size={24} style={styles.indicatorIcons} />
                            <DefaultText style={styles.simpleInfoLabel}>{changeMinutesToHoursAndMinutes(mealDetails.readyInMinutes)}</DefaultText>
                        </View>
                        <View style={styles.simpleInfo}>
                            <MaterialCommunityIcons name="silverware-fork-knife" color={calculateServingsColor(mealDetails.servings)} size={24} style={styles.indicatorIcons} />
                            <DefaultText style={styles.simpleInfoLabel}>{mealDetails.servings} servings</DefaultText>
                        </View>
                        <View style={styles.simpleInfo}>
                            <Ionicons name="ios-heart-empty" color={calculateHearthColor(mealDetails.aggregateLikes)} size={24} style={styles.indicatorIcons} />
                            <DefaultText style={styles.simpleInfoLabel}>{mealDetails.aggregateLikes} Likes</DefaultText>
                        </View>
                        <View style={styles.simpleInfo}>
                            <FontAwesome name="star" color={calculateStarColor(mealDetails.spoonacularScore)} size={24} style={styles.indicatorIcons} />
                            <DefaultText style={styles.simpleInfoLabel}>Rating: {mealDetails.spoonacularScore}/100 </DefaultText>
                        </View>
                    </View>
                    <View style={styles.mainTags}>
                        <View style={styles.tagsContainer}>
                            {renderTags()}
                        </View>
                    </View>
                    <DefaultText style={styles.sectionTitle}>
                        Ingredients:
                    </DefaultText>
                    <DefaultText style={styles.tutorialLabel}>
                        Swipe arrow left to add to your grocery list
                    </DefaultText>
                    <View style={styles.ingredientsMainContainer}>
                        {renderIngredients()}
                    </View>

                </View>
            </ScrollView>}
            {loading && <View style={styles.loadingContainer} ><ActivityIndicator size='large' color={color} /></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    backgroundImage: {
        width: '100%',
        //aspectRatio: 1,
        //minHeight: Dimensions.get('screen').height / 1.7,
        zIndex: 0,
        position: 'absolute',
        top: 0,
        right: 0,

    },
    mainScrollView: {
        flex: 1
    },
    spaceFiller: {
        height: Dimensions.get('screen').height / 2,

    },
    mainContainer: {
        minHeight: Dimensions.get('screen').height / 2,
        backgroundColor: 'white',
        zIndex: 2,

        borderTopLeftRadius: SCROLLING_TAB_BORDER_RADIUS,
        borderTopRightRadius: SCROLLING_TAB_BORDER_RADIUS,
    },
    upArrowContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 5,

    },
    upArrow: {
        height: 23
    },
    titleContainer: {
        paddingTop: 5,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'sofia-bold',
        fontSize: 30,
        textAlign: 'center'
    },
    sectionTitle: {
        fontFamily: 'sofia-bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: '3%'
    },
    tutorialLabel:{
        textAlign:'center',
        color:Colors.gray
    },
    simpleInfoContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 15
    },
    simpleInfo: {
        flex: 0.25,
        alignItems: 'center',
        marginHorizontal: "2%"
    },
    simpleInfoLabel: {
        fontSize: 14,
        color: Colors.darkGray,
        textAlign: 'center'
    },
    mainTags: {
        paddingTop: '4%',

    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    tagContainer: {
        borderRadius: 50,
        backgroundColor: Colors.lighterGray,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical:5,
    },
    tagLabel: {
        color: Colors.darkGray,


        textAlign: 'center',


        //padding:'1%'
    },

})

export default MealDetailsScreen
