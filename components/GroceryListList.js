import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, LayoutAnimation, SectionList } from 'react-native';
import Aisle from './Aisle';
import { CustomLayoutScaleY, CustomLayoutSpring, CustomLayoutDelete } from '../constants/LayoutAnimations';
import DefaultText from './DefaultText';
import Product from './Product';
import { useDispatch } from 'react-redux';
import { setNewProductsList } from '../store/actions/GroceryListActions';
import { useFocusEffect } from '@react-navigation/native';

const GroceryListList = ({ data }) => {
    const [localOrderedAislesList, setLocalOrderedAislesList] = useState([])
    const [visibilityOfAisles, setVisibilityOfAisles] = useState({ All: true })
    const [canMove, setCanMove] = useState(true)
    const dispatch = useDispatch();


    const unorderedAislesList = {};
    let orderedAislesList = [];


    useEffect(() => {
        data.forEach(item => {
            if (unorderedAislesList["All"] === undefined) {
                unorderedAislesList["All"] = [item]
            } else {
                unorderedAislesList["All"] = [...unorderedAislesList["All"], item];
            }
            if (item.aisle !== undefined && item.aisle !== null) {
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
            }
        })
        orderedAislesList = [];
        Object.keys(unorderedAislesList).sort().forEach((key) => {
            //console.log(key)
            orderedAislesList = [...orderedAislesList, { title: key, data: unorderedAislesList[key] }]
        });

        setLocalOrderedAislesList(orderedAislesList);
    }, [data])

    const setAisleVisiblility = (aisle, isVisible) => {
        setVisibilityOfAisles(prev => {
            prev[aisle] = isVisible;
            return { ...prev };
        })
        // const index = visibilityOfAisles.findIndex(item => item.aisle === aisle)
        // setVisibilityOfAisles(prev => {
        //     if (index >= 0) {
        //         const copyOfVisibiltyArray = prev;
        //         copyOfVisibiltyArray[index] = { aisle: aisle, visible: isVisible };
        //         return ([...copyOfVisibiltyArray])
        //     } else {
        //         return [...prev, { aisle: aisle, visible: isVisible }]
        //     }
        // })

    }


    const moveProductOneIndexUp = (index) => {
        console.log(canMove)
        // if (canMove === true) {
        console.log("Moving " + index + " One up")
        const currnetArrayCopy = data;
        const movedItemCopy = currnetArrayCopy[index]
        currnetArrayCopy[index] = currnetArrayCopy[index - 1]
        currnetArrayCopy[index - 1] = movedItemCopy;
        setCanMove(false)
        dispatch(setNewProductsList(currnetArrayCopy))
        // }

    }
    const moveProductOneIndexDown = (index) => {
        console.log(canMove)
        // if (canMove === true) {
        console.log("Moving " + index + " One down")
        const currnetArrayCopy = data;
        const movedItemCopy = currnetArrayCopy[index]
        currnetArrayCopy[index] = currnetArrayCopy[index + 1]
        currnetArrayCopy[index + 1] = movedItemCopy;
        setCanMove(false)
        dispatch(setNewProductsList(currnetArrayCopy))
        // }

    }

    const renderListHeader = ({ section }) => {
        return <View><Aisle aisle={section.title} data={section.data} setVisibility={setAisleVisiblility} /></View>
    }

    const renderListItem = ({ item, index, section }) => {
        // const visIndex = visibilityOfAisles.findIndex(visItem => visItem.aisle === section.title)

        if (visibilityOfAisles[section.title] === true) {
            if (section.title === "All") {
                return <View><Product data={item} index={index} aisleLength={section.data.length} enableMoving={true}
                    moveProductOneIndexUp={moveProductOneIndexUp} moveProductOneIndexDown={moveProductOneIndexDown} /></View>
            } else {
                return <View><Product data={item} index={index} /></View>
            }
        }else{
            return null
        }

        // if (visIndex >= 0) {
        //     if (visibilityOfAisles[visIndex].visible === true) {
        //         if (section.title === "All") {
        //             return <View><Product data={item} index={index} aisleLength={section.data.length} enableMoving={true}
        //                 moveProductOneIndexUp={moveProductOneIndexUp} moveProductOneIndexDown={moveProductOneIndexDown} /></View>
        //         } else {
        //             return <View><Product data={item} index={index} /></View>
        //         }
        //     } else {
        //         return null
        //     }

        // } else {
        //     return null
        // }

    }

    return (
        <View style={styles.mainListContainer}>
            <SectionList
                sections={localOrderedAislesList}
                renderItem={renderListItem}
                renderSectionHeader={renderListHeader}
                keyExtractor={item => item.id}
            />

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
