import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import DefaultText from '../components/DefaultText'
import {Ionicons} from '@expo/vector-icons'
import Colors from '../constants/Colors'

const RecipePreview = (props) => {
    const { title, id, image, readyInMinutes, servings } = props;



    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri:`https://spoonacular.com/recipeImages/${image}`}} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.titleContainer}>
                    <DefaultText style={styles.title}>{title}</DefaultText>
                </View>
                <View style={styles.timeAndServingsInfoContanier} >
                    <DefaultText style={styles.timeandServingsInfo}>{readyInMinutes}</DefaultText>
                    <DefaultText style={styles.timeandServingsInfo}>{servings}</DefaultText>
                    
                </View>
                <View style={styles.arrowConatiner}>
                    <Ionicons name="ios-arrow-round-forward" size={28} />
                </View>
            </View>
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
        borderRadius:12,
        overflow:'hidden'
        
    },
    image: {
        width: '100%',
        height: '100%'
    },
    timeAndServingsInfoContanier:{
        flexDirection:'row',
        
    },
    timeandServingsInfo:{
        color:Colors.darkGray
    },
    infoContainer:{
        width:'75%'
    },
    titleContainer:{
        height:'50%'
    },
    title:{
        fontFamily:'sofia-bold',
        fontSize:18,
        textAlign:'center',
        
    },
    arrowConatiner:{
        flexDirection:'row-reverse',
        paddingLeft:'5%'
    }

})

export default RecipePreview
