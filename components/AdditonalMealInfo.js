import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import { normalizePaddingSize } from '../methods/normalizeSizes';
import DefaultText from './DefaultText';

const AdditonalMealInfo = (props) => {
    const { mealDetails } = props;
    const additionalInfoData = useRef({
        Cheap: mealDetails.cheap,
        Dairy_Free: mealDetails.dairyFree,
        Gluten_Free: mealDetails.glutenFree,
        Ketogenic: mealDetails.ketogenic,
        Vegan: mealDetails.vegan,
        Vegetarian: mealDetails.vegetarian,
        Very_Healthy: mealDetails.veryHealthy,
        Very_Popular: mealDetails.veryPopular,
    }).current
    let positiveInfoList = useRef([]).current;
    let negativeInfoList = useRef([]).current;

    const [positiveRenderList, setPositiveRenderList] = useState([])
    const [negativeRenderList, setNegativeRenderList] = useState([])

    useEffect(() => {
        for (let value in additionalInfoData) {
            if (additionalInfoData[value] === true) {
                positiveInfoList = [...positiveInfoList, value]
            } else {
                negativeInfoList = [...negativeInfoList, value]
            }
        }
        setPositiveRenderList(positiveInfoList)
        setNegativeRenderList(negativeInfoList)
    }, [])

    const renderPositiveList = () => {
        return positiveRenderList.map(item => {
            let modifiedItem = item;
            if(item.includes("_")){
                let splited = modifiedItem.split("_");
                modifiedItem = splited[0] + " " + splited[1];
            }
            return (
                <View key={item} style={styles.listItemContainer}>
                    <DefaultText style={{ ...styles.listItem }}>{modifiedItem} : <DefaultText style={{color:Colors.green}}>Yes</DefaultText></DefaultText>
                </View>
            )
        })
    }
    const renderNegativeList = () => {
        return negativeRenderList.map(item => {
            let modifiedItem = item;
            if(item.includes("_")){
                let splited = modifiedItem.split("_");
                modifiedItem = splited[0] + " " + splited[1];
            }
            return (
                <View key={item} style={styles.listItemContainer}>
                    <DefaultText style={{ ...styles.listItem }}>{modifiedItem} : <DefaultText style={{color:Colors.red}}>No</DefaultText></DefaultText>
                </View>
            )
        })
    }

    return (
        <View style={styles.listContainer}>
            <View style={{...styles.halfListContainer, flex:positiveRenderList.length > 0 ? negativeRenderList.length > 0 ? 0.5 : 1 : 0}}>
                {renderPositiveList()}
            </View>
            <View style={{...styles.halfListContainer, flex:negativeRenderList.length > 0 ? positiveRenderList.length > 0 ? 0.5 : 1 : 0}}>
                {renderNegativeList()}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        alignItems:'center',
        paddingBottom:normalizePaddingSize(10) ,
        flexDirection:'row'
    },
    listItemContainer: {

    },
    listItem: {
        fontSize: 18
    },
    halfListContainer:{
        alignItems:'center'
    }
})

export default AdditonalMealInfo
