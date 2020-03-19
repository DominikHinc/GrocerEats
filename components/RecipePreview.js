import { AntDesign, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import DefaultText from '../components/DefaultText'
import Colors from '../constants/Colors'
import { calculateServingsColor, calculateTimeColor } from '../methods/calculateColors'
import { changeMinutesToHoursAndMinutes } from '../methods/mathHelper'
import { normalizeBorderRadiusSize, normalizeIconSize, normalizeMarginSize } from '../methods/normalizeSizes'
import FloatingHeartIcon from './FloatingHeartIcon'




const RecipePreview = ({ title, id, image, readyInMinutes, servings, onPress, missedIngredients, usedIngredients }) => {
    const readyInMinutesChangedToHoursAndMinutes = changeMinutesToHoursAndMinutes(readyInMinutes)
    let clockColor = calculateTimeColor(readyInMinutes)
    let servingsColor = calculateServingsColor(servings)
    //let isMealSaved = useSelector(state => state.savedRecipes.savedRecipes).find(item => item.id === id)
    const [isMealSaved, setIsMealSaved] = useState(useSelector(state => state.savedRecipes.savedRecipes).find(item => item.id === id))
    const dispatch = useDispatch();
    //TODO implement saving logic that will work with just preview
    const onHeartIconPressed = () => {
        // !isMealSaved ? dispatch(saveRecipe(id)) : dispatch(removeSavedRecipe(id))
        //console.log(isMealSaved)
        setIsMealSaved(prev => prev === true ? false : true)
    }
    //console.log(`https://spoonacular.com/recipeImages/${id}-240x150.${image.includes(".") ? (image.split('.'))[1] : image}`)
    return (
        <View>
            <FloatingHeartIcon active={isMealSaved} small={true} alignLeft={true} onPress={onHeartIconPressed} />
            <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image !== undefined ? `https://spoonacular.com/recipeImages/${id}-240x150.${image.includes(".") ? (image.split('.'))[1] : image}` : null }}
                            style={styles.image} defaultSource={require('../assets/Images/No_Internet_Connection.png')} />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <DefaultText numberOfLines={1} style={styles.title}>{title}</DefaultText>
                        </View>
                        {usedIngredients !== undefined && missedIngredients !== undefined && <DefaultText style={styles.basicInfo}>Ingredients:</DefaultText>}
                        <View style={[styles.basicInfoContainer, { paddingTop: usedIngredients !== undefined && missedIngredients !== undefined ? 0 : '3%' }]} >
                            {readyInMinutes !== undefined && <AntDesign name="clockcircleo" color={clockColor} size={normalizeIconSize(16)} style={styles.indicatorIcons} />}
                            {readyInMinutes !== undefined && <DefaultText style={styles.basicInfo}>{readyInMinutesChangedToHoursAndMinutes}</DefaultText>}
                            {servings !== undefined && <MaterialCommunityIcons name="silverware-fork-knife" color={servingsColor} size={normalizeIconSize(16)} style={styles.indicatorIcons} />}
                            {servings !== undefined && <DefaultText style={styles.basicInfo}>{servings} servings</DefaultText>}

                            {usedIngredients !== undefined && usedIngredients > 0 && <Foundation name="check" color={Colors.green} size={normalizeIconSize(16)} style={styles.indicatorIcons} />}
                            {usedIngredients !== undefined && usedIngredients > 0 && <DefaultText style={styles.basicInfo}>{usedIngredients} used</DefaultText>}
                            {missedIngredients !== undefined && missedIngredients > 0 && <Foundation name="x" color={Colors.red} size={normalizeIconSize(16)} style={styles.indicatorIcons} />}
                            {missedIngredients !== undefined && missedIngredients > 0 && <DefaultText style={styles.basicInfo}>{missedIngredients} missing</DefaultText>}

                        </View>
                        <View style={[styles.arrowConatiner, { marginTop: usedIngredients !== undefined && missedIngredients !== undefined ? 0 : normalizeMarginSize(-5) }]}>
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
        borderRadius: normalizeBorderRadiusSize(12),
        overflow: 'hidden'

    },
    image: {
        width: '100%',
        height: '100%'
    },
    basicInfoContainer: {
        flexDirection: 'row',

        alignItems: 'center',

    },
    basicInfo: {
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
        //marginTop:-10
    },
    indicatorIcons: {
        marginRight: '1.5%'
    }
})

export default RecipePreview
