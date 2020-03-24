import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Aisle from './Aisle';


const GroceryListList = ({ data }) => {

    const unorderedAislesList = {};
    const orderedAislesList = {};
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

    const renderAisle = () => {
        return Object.keys(orderedAislesList).map(item => {

            return <View key={item}>
                <Aisle  data={orderedAislesList[item]} aisle={item} />
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
