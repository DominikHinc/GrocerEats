import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, LayoutAnimation } from 'react-native';
import Aisle from './Aisle';
import { CustomLayoutScaleY } from '../constants/LayoutAnimations';


const GroceryListList = ({ data }) => {
    // LayoutAnimation.configureNext(CustomLayoutScaleY)
    const [localOrderedAislesList, setLocalOrderedAislesList] = useState([])
    const [allowAnimation, setAllowAnimation] = useState(true)
    // LayoutAnimation.configureNext(CustomLayoutScaleY)

    const unorderedAislesList = {};
    const orderedAislesList = {};
  
    useEffect(() => {
        data.forEach(item => {
            if (unorderedAislesList["All"] === undefined) {
                unorderedAislesList["All"] = [item]
            } else {
                unorderedAislesList["All"] = [...unorderedAislesList["All"], item];
            }
            if (item.aisle.includes(';')) {
                const categoriesGroup = item.aisle.split(";");
                categoriesGroup.forEach(category => {
                    if (unorderedAislesList[category] === undefined) {
                        unorderedAislesList[category] = [item]
                    } else {
                        unorderedAislesList[category] = [...unorderedAislesList[category], item]
                    }
                })

            } else {
                if (unorderedAislesList[item.aisle] === undefined) {
                    unorderedAislesList[item.aisle] = [item]
                } else {
                    unorderedAislesList[item.aisle] = [...unorderedAislesList[item.aisle], item];
                }
            }

        })
        Object.keys(unorderedAislesList).sort().forEach((key) => {
            orderedAislesList[key] = unorderedAislesList[key];
        });
        if(Object.keys(unorderedAislesList).length < Object.keys(localOrderedAislesList).length){
            setAllowAnimation(false)
        }else{
            setAllowAnimation(true);
        }
        
        setLocalOrderedAislesList(orderedAislesList);
    }, [data])


    const renderAisle = () => {
        return Object.keys(localOrderedAislesList).map(item => {
            
            return <View key={item}>
                <Aisle data={localOrderedAislesList[item]} aisle={item} allowAnimation={allowAnimation} />
            </View>
        })
    }

    return (
        <View style={styles.mainListContainer}>
            {/* Using Scroll View, beacue with it animations are smoother */}
            <ScrollView style={styles.listScrollView} >
                {renderAisle()}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    mainListContainer: {
        flex: 1
    },
    listScrollView: {
        flex: 1
    }
})

export default GroceryListList
