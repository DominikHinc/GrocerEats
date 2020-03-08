import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import StandardSearchScreen from '../screens/StandardSearchScreen'
import SearchByIngredientsScreen from '../screens/SearchByIngredientsScreen'
import SearchByNutrientsScreen from '../screens/SearchByNutrientsScreen'
import YourGroceryListScreen from '../screens/YourGroceryListScreen'
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { Platform } from 'react-native';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import Logo from '../components/Logo';


const StandardBottomTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const iconSize = 24;

const forFade = ({ current, closing }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const IOSTabBarOptions = {
    showLabel: false,
    activeTintColor: Colors.blue
}

const StackNavigator = createStackNavigator();

const searchStackNavigator = () => {
    return (<StackNavigator.Navigator headerMode='none' >
        <StackNavigator.Screen name="StandardSearch" component={StandardSearchScreen} options={{ cardStyleInterpolator: forFade }} />
        <StackNavigator.Screen name="MealDetails" component={MealDetailsScreen} options={{ cardStyleInterpolator: forFade }}  />
    </StackNavigator.Navigator>)
}
const searchByIngradientsStackNavigator = () => {
    return (<StackNavigator.Navigator headerMode='none'>
        <StackNavigator.Screen name="SearchByIngradients" component={SearchByIngredientsScreen} />
        <StackNavigator.Screen name="MealDetails" component={MealDetailsScreen} />
    </StackNavigator.Navigator>)
}
const searchByNutrientsStackNavigator = () => {
    return (<StackNavigator.Navigator headerMode='none'>
        <StackNavigator.Screen name="SearchByNutrients" component={SearchByNutrientsScreen} />
        <StackNavigator.Screen name="MealDetails" component={MealDetailsScreen} />
    </StackNavigator.Navigator>)
}
const yourGroceryListStackNavigator = () => {
    return (<StackNavigator.Navigator headerMode='none'>
        <StackNavigator.Screen name="YourGroceryList" component={YourGroceryListScreen} />
        <StackNavigator.Screen name="MealDetails" component={MealDetailsScreen} />
    </StackNavigator.Navigator>)
}

const myTabNavigator = () => {
    return (
        <StandardBottomTabNavigator.Navigator labeled={true} backBehavior='history' >
            <StandardBottomTabNavigator.Screen name="StandardSearch" component={searchStackNavigator} options={{
                tabBarLabel: 'Search',
                tabBarColor: Colors.blue,
                tabBarIcon: ({ color }) => {
                    return <Ionicons name="ios-search" size={iconSize} color={color} />
                },
            }} />
            <StandardBottomTabNavigator.Screen name="SearchByIngradients" component={searchByIngradientsStackNavigator} options={{
                tabBarLabel: 'Ingredients',
                tabBarColor: Colors.yellow,
                tabBarIcon: ({ color }) => {
                    return <MaterialCommunityIcons name="food-variant" size={iconSize} color={color} />
                }
            }} />
            <StandardBottomTabNavigator.Screen name="SearchByNutrients" component={searchByNutrientsStackNavigator} options={{
                tabBarLabel: 'Nutrients',
                tabBarColor: Colors.green,
                tabBarIcon: ({ color }) => {
                    return <AntDesign name='piechart' size={iconSize} color={color} />
                }
            }} />
            <StandardBottomTabNavigator.Screen name="YourGroceryList" component={yourGroceryListStackNavigator} options={{
                tabBarLabel: 'Your List',
                tabBarColor: Colors.red,
                tabBarIcon: ({ color }) => {
                    return <Ionicons name='ios-list-box' size={iconSize} color={color} />
                }
            }} />
        </StandardBottomTabNavigator.Navigator>
    )
}

export default myTabNavigator
