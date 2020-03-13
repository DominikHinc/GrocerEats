import React from 'react'
import { View, Text, StyleSheet, Image, Animated, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity } from 'react-native'
import DefaultText from '../components/DefaultText'
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { calculateServingsColor, calculateTimeColor } from '../methods/calculateColors'
import { changeMinutesToHoursAndMinutes } from '../methods/mathHelper'



const RecipePreview = (props) => {
    const { title, id, image, readyInMinutes, servings, onPress } = props;
    const readyInMinutesChangedToHoursAndMinutes = changeMinutesToHoursAndMinutes(readyInMinutes)
    let clockColor = calculateTimeColor(readyInMinutes)
    let servingsColor = calculateServingsColor(servings)

    // if(readyInMinutes <= 45){
    //     clockColor=Colors.green
    // }else if(readyInMinutes <= 75){
    //     clockColor=Colors.yellow
    // }else{
    //     clockColor=Colors.red
    // }
    // if(servings <= 4){
    //     servingsColor=Colors.green
    // }else if(servings <= 8){
    //     servingsColor=Colors.yellow
    // }else{
    //     servingsColor=Colors.blue
    // }

    return (
        <View>
            <TouchableOpacity style={{flex:1}} onPress={onPress}>
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: `https://spoonacular.com/recipeImages/${image}` }} style={styles.image} />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <DefaultText numberOfLines={1} style={styles.title}>{title}</DefaultText>
                        </View>
                        <View style={styles.timeAndServingsInfoContanier} >
                            <AntDesign name="clockcircleo" color={clockColor} size={15} style={styles.indicatorIcons} />
                            <DefaultText style={styles.timeandServingsInfo}>{readyInMinutesChangedToHoursAndMinutes}</DefaultText>
                            <MaterialCommunityIcons name="silverware-fork-knife" color={servingsColor} size={15} style={styles.indicatorIcons} />
                            <DefaultText style={styles.timeandServingsInfo}>{servings} servings</DefaultText>

                        </View>
                        <View style={styles.arrowConatiner}>
                            <Ionicons name="ios-arrow-round-forward" size={28} />
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
        borderRadius: 12,
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
        marginRight: '10%'
    },
    infoContainer: {
        width: '75%',
        paddingHorizontal: '5%'
    },
    titleContainer: {

    },
    title: {
        fontFamily: 'sofia-bold',
        fontSize: 18,
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
