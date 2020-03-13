import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Alert, ImageBackground, Image, Dimensions, Animated } from 'react-native'
import Logo from '../components/Logo'
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { APIKEY_DETAILS } from '../constants/APIKEY';
import GoBackArrow from '../components/GoBackArrow';
import { Ionicons, SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';

const MealDetailsScreen = (props) => {
    const { color, id } = props.route.params;
    const [loading, setLoading] = useState(true)
    const [mealDetails, setMealDetails] = useState({})
    const [upArrowType, setUpArrowType] = useState('arrow-up')
    const currentContentOffset = new Animated.Value(0)


    const fetchMealDataFromServer = async () => {
        setLoading(true)
        let response;
        let readableResponse;
        try {
            response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${APIKEY_DETAILS}`)
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
        setMealDetails(readableResponse)
        setLoading(false)
    }

    useEffect(() => {
        fetchMealDataFromServer();
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

    return (
        <View style={styles.screen}>
            <GoBackArrow goBack={() => { props.navigation.goBack() }} />
            <Animated.Image source={{ uri: mealDetails.image }} style={[styles.backgroundImage, { opacity: imageOpacity }]} resizeMode='cover' />

            <ScrollView style={styles.mainScrollView} onScroll={onScrollHandler} onMomentumScrollEnd={onMomentumEndHandler}>
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
                </View>
            </ScrollView>
            {loading && <View style={styles.loadingContainer} ><ActivityIndicator size='large' color={color} /></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'black'
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
        aspectRatio: 1,
        minHeight: Dimensions.get('screen').height / 1.7,
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
        borderWidth: 1,
        borderColor: 'blue'
    },
    mainContainer: {
        height: Dimensions.get('screen').height,
        backgroundColor: 'white',
        zIndex: 2,
        borderColor: 'red',
        borderWidth: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    upArrowContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 5,

    },
    upArrow:{
        height:23
    },
    titleContainer:{
        paddingTop:5,
        alignItems:'center'
    },
    title:{
        fontFamily:'sofia-bold',
        fontSize:30,
        textAlign:'center'
    }
})

export default MealDetailsScreen
