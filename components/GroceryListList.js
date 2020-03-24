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
    // LayoutAnimation.configureNext(CustomLayoutScaleY)
    const [localOrderedAislesList, setLocalOrderedAislesList] = useState([])
    const [allowAnimation, setAllowAnimation] = useState(false)
    const [visibilityOfAisles, setVisibilityOfAisles] = useState([{ aisle: "All", visible: true }])
    const [canMove, setCanMove] = useState(true)
    const dispatch = useDispatch();

    // LayoutAnimation.configureNext(CustomLayoutScaleY)

    const unorderedAislesList = {};
    let orderedAislesList = [];


    useEffect(() => {
        //setCanMove(true)
        // LayoutAnimation.configureNext(CustomLayoutDelete, () => { setCanMove(true) })
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
            // orderedAislesList[key] = unorderedAislesList[key];
            console.log(key)
            orderedAislesList = [...orderedAislesList, { title: key, data: unorderedAislesList[key] }]
            // if(Object.keys(visibilityOfAisles).find(key) === undefined){
            //     setVisibilityOfAisles(prev=>{
            //         prev[key] = false
            //         return prev;
            //     })
            // }
        });

        // if (localOrderedAislesList.length === orderedAislesList.length || localOrderedAislesList.length - 1 === orderedAislesList.length) {
        //     LayoutAnimation.configureNext(CustomLayoutDelete, () => { setCanMove(true) })
        // }

        setLocalOrderedAislesList(orderedAislesList);
    }, [data, visibilityOfAisles])

    const setAisleVisiblility = (aisle, isVisible) => {
        const index = visibilityOfAisles.findIndex(item => item.aisle === aisle)
        setVisibilityOfAisles(prev => {
            if (index >= 0) {
                const copyOfVisibiltyArray = prev;
                copyOfVisibiltyArray[index] = { aisle: aisle, visible: isVisible };
                return ([...copyOfVisibiltyArray])
            } else {
                return [...prev, { aisle: aisle, visible: isVisible }]
            }
        })

    }




    // const renderAisle = () => {
    //     return Object.keys(localOrderedAislesList).map(item => {

    //         return <View key={item}>
    //             <Aisle data={localOrderedAislesList[item]} aisle={item} allowAnimation={allowAnimation} />
    //         </View>
    //     })
    // }

    const moveProductOneIndexUp = (index) => {
        console.log(canMove)
        if (canMove === true) {
            console.log("Moving " + index + " One up")
            const currnetArrayCopy = data;
            const movedItemCopy = currnetArrayCopy[index]
            currnetArrayCopy[index] = currnetArrayCopy[index - 1]
            currnetArrayCopy[index - 1] = movedItemCopy;
            setCanMove(false)
            dispatch(setNewProductsList(currnetArrayCopy))
        }

    }
    const moveProductOneIndexDown = (index) => {
        console.log(canMove)
        if (canMove === true) {
            console.log("Moving " + index + " One down")
            const currnetArrayCopy = data;
            const movedItemCopy = currnetArrayCopy[index]
            currnetArrayCopy[index] = currnetArrayCopy[index + 1]
            currnetArrayCopy[index + 1] = movedItemCopy;
            setCanMove(false)
            dispatch(setNewProductsList(currnetArrayCopy))
        }

    }

    const renderListHeader = ({ section }) => {
        return <View><Aisle aisle={section.title} data={section.data} setVisibility={setAisleVisiblility} /></View>
    }

    const renderListItem = ({ item, index, section }) => {
        //console.log(visibilityOfAisles[section.title])
        // console.log(section)
        const visIndex = visibilityOfAisles.findIndex(visItem => visItem.aisle === section.title)

        if (visIndex >= 0) {
            if (visibilityOfAisles[visIndex].visible === true) {
                if (section.title === "All") {
                    return <View><Product data={item} index={index} aisleLength={section.data.length} enableMoving={true}
                        moveProductOneIndexUp={moveProductOneIndexUp} moveProductOneIndexDown={moveProductOneIndexDown} /></View>
                } else {
                    return <View><Product data={item} index={index} /></View>
                }
            } else {
                return null
            }

        } else {
            return null
        }

    }

    return (
        <View style={styles.mainListContainer}>
            {/* Using Scroll View, beacue with it animations are smoother */}
            {/* <ScrollView style={styles.listScrollView} >
                {renderAisle()}
            </ScrollView> */}
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
