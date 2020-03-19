import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import AdditonalMealInfo from '../components/AdditonalMealInfo';
import AddToGroceryListModal from '../components/AddToGroceryListModal';
import BasicMealInfo from '../components/BasicMealInfo';
import DefaultText from '../components/DefaultText';
import FloatingHeartIcon from '../components/FloatingHeartIcon';
import GoBackArrow from '../components/GoBackArrow';
import MealPreparation from '../components/MealPreparation';
import MealTags from '../components/MealTags';
import SwipableCard from '../components/SwipableCard';
import Colors from '../constants/Colors';
import { ERROR_WHILE_FETCHING, fetchMealDetailsFromServer, MAXIMUM_NUMERS_OF_CALLS_REACHED, SUCCESS } from '../methods/fetchFromServer';
import { normalizeIconSize, normalizePaddingSize } from '../methods/normalizeSizes';
import { removeSavedRecipe, saveRecipe } from '../store/actions/SavedRecipesActions';

const SCROLLING_TAB_BORDER_RADIUS = 30

const MealDetailsScreen = (props) => {
    const { color, id, gotDetailedData } = props.route.params;
    const savedRecipesList = useSelector(state => state.savedRecipes.savedRecipes)
    const [loading, setLoading] = useState(true)
    const [mealDetails, setMealDetails] = useState(false)

    const [upArrowType, setUpArrowType] = useState('arrow-up')
    const [scrollable, setScrollable] = useState(true)
    const currentContentOffset = new Animated.Value(0)

    const [isMealSaved, setIsMealSaved] = useState(savedRecipesList.find(item => item.id === id) === undefined ? false : true)

    const [modalControl, setModalControl] = useState({
        modalVisible: false,
        title: 'Title',
        imageUrl: '',
        amountControl: {
            amountMain: 0,
            amountSecondary: 0,
            unitMain: '',
            unitSecondary: ''
        }
    })

    const dispatch = useDispatch()


    //Setters
    const setModalVisiblilty = (shouldBeVisible) => {
        setModalControl(prev => {
            return { ...prev, modalVisible: shouldBeVisible };

        })
    }

    const setInfoForModal = (info) => {
        setModalControl(info)
    }

    const setScrolling = (canScroll) => {
        setScrollable(canScroll);
    }

    useEffect(() => {
        if (mealDetails === false) {
            if (gotDetailedData === true) {
                setMealDetails(savedRecipesList.find(item => item.id === id).mealDetails)
                setLoading(false)
            } else {
                setLoading(true)
                fetchMealDetailsFromServer(id).then(response => {
                    switch (response.status) {
                        case ERROR_WHILE_FETCHING:
                            props.navigation.goBack()
                            Alert.alert("Something went wrong", response.error)
                            break;
                        case MAXIMUM_NUMERS_OF_CALLS_REACHED:
                            props.navigation.goBack()
                            Alert.alert("Something went wrong", response.error)
                            //, [{text:"Ok",onPress:()=>{props.navigation.goBack()}}]
                            break;
                        case SUCCESS:
                            setMealDetails(response.response)
                            break;
                    }
                    setLoading(false)
                }).catch(error => {
                    Alert.alert("Something went wrong", error.message)
                })
            }
        }

    }, [])


    //On Event happen handlers
    const onScrollHandler = (e) => {
        currentContentOffset.setValue(e.nativeEvent.contentOffset.y);
        setUpArrowType('minus');
    }
    const onMomentumEndHandler = (e) => {
        currentContentOffset.setValue(e.nativeEvent.contentOffset.y);
        setUpArrowType('arrow-up')
    }
    const onHeartIconPressed = () => {
        if (!loading) {
            !isMealSaved ? dispatch(saveRecipe(id, mealDetails)) : dispatch(removeSavedRecipe(id))
            setIsMealSaved(prev => !prev)
        }
    }

    //Interpolated variables
    const imageOpacity = currentContentOffset.interpolate({
        inputRange: [0, Dimensions.get('screen').height / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        easing: Easing.ease,
    })
    const imageHeight = currentContentOffset.interpolate({
        inputRange: [0, Dimensions.get('screen').height / 2],
        outputRange: [Dimensions.get('screen').height / 2 + SCROLLING_TAB_BORDER_RADIUS, Dimensions.get('screen').height / 6],
        extrapolate: 'clamp',
        easing: Easing.ease,

    })

    const renderIngredients = () => {
        if (mealDetails.extendedIngredients) {
            let ingredientsMap = {};
            return mealDetails.extendedIngredients.map((item, index) => {
                if (ingredientsMap[item.id] === 1) {
                    return null;
                }

                ingredientsMap[item.id] = 1
                return (
                    <SwipableCard key={item.id} item={item} setScrolling={setScrolling} setInfoForModal={setInfoForModal} />
                )
            })
        }
    }

    console.log("Rerendering mealDetails")

    return (
        <View style={{ ...styles.screen, backgroundColor: loading ? 'white' : 'black' }}>
            <GoBackArrow goBack={() => { props.navigation.goBack() }} />
            <FloatingHeartIcon onPress={onHeartIconPressed} active={isMealSaved} />
            <Animated.Image source={{ uri: `https://spoonacular.com/recipeImages/${id}-636x393.${mealDetails.imageType}` }} style={[styles.backgroundImage, { opacity: imageOpacity, height: imageHeight }]} resizeMode='cover' />

            {!loading && <ScrollView scrollEnabled={scrollable} style={styles.mainScrollView} onScroll={onScrollHandler}
                onMomentumScrollEnd={onMomentumEndHandler} showsVerticalScrollIndicator={false} scrollEventThrottle={17} onScrollBeginDrag={onScrollHandler}>
                <View style={styles.spaceFiller} />
                <View style={styles.mainContainer}>
                    <View style={styles.upArrowContainer}>
                        {upArrowType === 'minus' ? <AntDesign name='minus' size={normalizeIconSize(28)} color={Colors.gray} style={{ ...styles.upArrow, transform: [{ scaleX: 2 }] }} />
                            :
                            <SimpleLineIcons name={upArrowType} size={normalizeIconSize(25)} color={Colors.gray} style={styles.upArrow} />}
                    </View>
                    <View style={styles.titleContainer}>
                        <DefaultText style={styles.title}>{mealDetails.title}</DefaultText>
                    </View>

                    <BasicMealInfo readyInMinutes={mealDetails.readyInMinutes} servings={mealDetails.servings} 
                    likes={mealDetails.aggregateLikes} score={mealDetails.spoonacularScore} />

                    {mealDetails !== false && mealDetails.dishTypes.length > 0 && <View style={styles.mainTagsContainer}>
                        <View style={styles.tagsContainer}>
                            <MealTags tags={mealDetails.dishTypes} />
                        </View>
                    </View>}
                    <DefaultText style={styles.sectionTitle}>
                        Ingredients:
                    </DefaultText>
                    <DefaultText style={styles.tutorialLabel}>
                        Swipe arrow left to add to your grocery list
                    </DefaultText>

                    <View style={styles.ingredientsMainContainer}>
                        {renderIngredients()}
                    </View>

                    {mealDetails !== false && mealDetails.analyzedInstructions.length > 0 ? <View style={styles.stepsMainContainer}>
                        <DefaultText style={styles.sectionTitle}>Preparation:</DefaultText>
                        <MealPreparation steps={mealDetails.analyzedInstructions} />
                    </View>
                        :
                        <DefaultText style={{ textAlign: "center" }}>Preparation steps were not found</DefaultText>
                    }

                    <View style={styles.additionalInfoContainer} >
                        <DefaultText style={styles.sectionTitle}>Additional Info</DefaultText>
                        <AdditonalMealInfo mealDetails={mealDetails} />
                    </View>

                </View>
            </ScrollView>}
            {loading && <View style={styles.loadingContainer} ><ActivityIndicator size='large' color={color} /></View>}
            <AddToGroceryListModal modalVisible={modalControl.modalVisible} setModalVisible={setModalVisiblilty}
                title={modalControl.title} imageUrl={modalControl.imageUrl}
                amountControl={modalControl.amountControl} />

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
        flex: 1,

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
        paddingTop: normalizePaddingSize(5),

    },
    upArrow: {
        height: normalizeIconSize(23)
    },
    titleContainer: {
        paddingTop: normalizePaddingSize(5),
        alignItems: 'center',
        paddingHorizontal: normalizePaddingSize(5)
    },
    title: {
        fontFamily: 'sofia-bold',
        fontSize: 30,
        textAlign: 'center'
    },
    sectionTitle: {
        fontFamily: 'sofia-bold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: '3%'
    },
    tutorialLabel: {
        textAlign: 'center',
        color: Colors.gray
    },
    mainTagsContainer: {
        //paddingTop: '4%',

    },
    ingredientsMainContainer: {
        backgroundColor: 'white'
    },
    stepsMainContainer: {

    }

})

export default MealDetailsScreen
