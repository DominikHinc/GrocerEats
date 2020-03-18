import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Animated, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity } from 'react-native'
import DefaultText from '../components/DefaultText'
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { calculateServingsColor, calculateTimeColor } from '../methods/calculateColors'
import { changeMinutesToHoursAndMinutes } from '../methods/mathHelper'
import { normalizeIconSize, normalizeBorderRadiusSize } from '../methods/normalizeSizes'

import FloatingHeartIcon from './FloatingHeartIcon'
import { useSelector, useDispatch } from 'react-redux'
import { saveRecipe, removeSavedRecipe } from '../store/actions/SavedRecipesActions'



const RecipePreview = (props) => {
    const { title, id, image, readyInMinutes, servings, onPress } = props;
    const readyInMinutesChangedToHoursAndMinutes = changeMinutesToHoursAndMinutes(readyInMinutes)
    let clockColor = calculateTimeColor(readyInMinutes)
    let servingsColor = calculateServingsColor(servings)
    //let isMealSaved = useSelector(state => state.savedRecipes.savedRecipes).find(item => item.id === id)
    const [isMealSaved, setIsMealSaved] = useState(useSelector(state => state.savedRecipes.savedRecipes).find(item => item.id === id))
    const dispatch = useDispatch();
    //TODO implement saving logic that will work with just preview
    const onHeartIconPressed = () => {
        // !isMealSaved ? dispatch(saveRecipe(id)) : dispatch(removeSavedRecipe(id))
        console.log(isMealSaved)
        setIsMealSaved(prev => prev === true ? false : true)
    }
    
    return (
        <View>
            <FloatingHeartIcon active={isMealSaved} small={true} alignLeft={true} onPress={onHeartIconPressed} /> 
            <TouchableOpacity style={{flex:1}} onPress={onPress}>
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image !== undefined ? `https://spoonacular.com/recipeImages/${id}-240x150.${image.includes(".") ? (image.split('.'))[1] : image}` : null}} 
                        style={styles.image} defaultSource={require('../assets/Images/No_Internet_Connection.png')} />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <DefaultText numberOfLines={1} style={styles.title}>{title}</DefaultText>
                        </View>
                        <View style={styles.timeAndServingsInfoContanier} >
                            <AntDesign name="clockcircleo" color={clockColor} size={normalizeIconSize(16)} style={styles.indicatorIcons} />
                            <DefaultText style={styles.timeandServingsInfo}>{readyInMinutesChangedToHoursAndMinutes}</DefaultText>
                            <MaterialCommunityIcons name="silverware-fork-knife" color={servingsColor} size={normalizeIconSize(16) } style={styles.indicatorIcons} />
                            <DefaultText style={styles.timeandServingsInfo}>{servings} servings</DefaultText>

                        </View>
                        <View style={styles.arrowConatiner}>
                            <Ionicons name="ios-arrow-round-forward" size={normalizeIconSize(30)} />
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        width: '25%',
        aspectRatio: 1,
        borderRadius: normalizeBorderRadiusSize(12) ,
        overflow: 'hidden'

    },
    image: {
        width: '100%',
        height: '100%'
    },
    timeAndServingsInfoContanier: {
        flexDirection: 'row',
        paddingTop: '3%',
        alignItems: 'center',
        
    },
    timeandServingsInfo: {
        color: Colors.darkGray,
        marginRight: '10%',
        
    },
    infoContainer: {
        width: '75%',
        paddingHorizontal: '5%'
    },
    titleContainer: {

    },
    title: {
        fontFamily: 'sofia-bold',
        fontSize: 20,
        //textAlign:'center',

    },
    arrowConatiner: {
        flexDirection: 'row-reverse',
    },
    indicatorIcons: {
        marginRight: '1.5%'
    }
})

export default RecipePreview
