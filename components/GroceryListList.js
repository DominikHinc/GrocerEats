import React, { useRef } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import Product from './Product'
import Aisle from './Aisle';


const GroceryListList = ({ data }) => {

    const aislesList = {};
    data.forEach(item => {
        if (aislesList["All"] === undefined) {
            aislesList["All"] = [item]
        } else {
            aislesList["All"] = [...aislesList["All"], item];
        }
        if (item.aisle.includes(';')) {
            const categoriesGroup = item.aisle.split(";");
            categoriesGroup.forEach(category=>{
                if(aislesList[category] === undefined){
                    aislesList[category] = [item]
                }else{
                    aislesList[category] = [...aislesList[category],item]
                }
            })

        } else {
            if (aislesList[item.aisle] === undefined) {
                aislesList[item.aisle] = [item]
            } else {
                aislesList[item.aisle] = [...aislesList[item.aisle], item];
            }
        }

    })

    // const renderAisle = ({ item, index }) => {
    //     return <Aisle data={aislesList[item]} aisle={item} />
    // }

    const renderAisle = () => {
        return Object.keys(aislesList).map(item => {

            return <Aisle key={item} data={aislesList[item]} aisle={item} />
        })
    }

    //console.log(aislesList)

    return (
        <View style={styles.mainListContainer}>
            {/* <FlatList data={Object.keys(aislesList)} keyExtractor={item => aislesList[item].id} renderItem={renderAisle} /> */}
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
