import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';
import { calculateHearthColor, calculateServingsColor, calculateStarColor, calculateTimeColor } from '../methods/calculateColors';
import { changeMinutesToHoursAndMinutes } from '../methods/mathHelper';
import { normalizeFontSize, normalizePaddingSize } from '../methods/normalizeSizes';
const BasicMealInfo = (props) => {
    const {mealDetails} = props

    return (
        <View style={styles.simpleInfoContainer}>
            <View style={styles.simpleInfo}>
                <AntDesign name="clockcircleo" color={calculateTimeColor(mealDetails.readyInMinutes)} size={normalizeFontSize(30)} style={styles.indicatorIcons} />
                <DefaultText style={styles.simpleInfoLabel}>{changeMinutesToHoursAndMinutes(mealDetails.readyInMinutes)}</DefaultText>
            </View>
            <View style={styles.simpleInfo}>
                <MaterialCommunityIcons name="silverware-fork-knife" color={calculateServingsColor(mealDetails.servings)} size={normalizeFontSize(30)} style={styles.indicatorIcons} />
                <DefaultText style={styles.simpleInfoLabel}>{mealDetails.servings} servings</DefaultText>
            </View>
            <View style={styles.simpleInfo}>
                <Ionicons name="ios-heart-empty" color={calculateHearthColor(mealDetails.aggregateLikes)} size={normalizeFontSize(30)} style={styles.indicatorIcons} />
                <DefaultText style={styles.simpleInfoLabel}>{mealDetails.aggregateLikes} Likes</DefaultText>
            </View>
            <View style={styles.simpleInfo}>
                <FontAwesome name="star" color={calculateStarColor(mealDetails.spoonacularScore)} size={normalizeFontSize(30)} style={styles.indicatorIcons} />
                <DefaultText style={styles.simpleInfoLabel}>Rating: {mealDetails.spoonacularScore}/100 </DefaultText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    simpleInfoContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: normalizePaddingSize(15) ,
        paddingBottom:'4%'
    },
    simpleInfo: {
        flex: 0.25,
        alignItems: 'center',
        marginHorizontal: "2%"
    },
    simpleInfoLabel: {
        fontSize: 16,
        color: Colors.darkGray,
        textAlign: 'center'
    },
})

export default BasicMealInfo
