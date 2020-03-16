import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import Logo from '../components/Logo'
import Colors from '../constants/Colors'


const SearchByIngredientsScreen = (props) => {
    const [language, setLanguage] = useState("Java")
    const picker = useRef()
    useEffect(()=>{
        console.log(picker)
    },[])
    return (
        <View style={styles.screen}>
            <Logo color={Colors.yellow} />
            <Text>SearchByIngredientsScreen</Text>
            <Picker
                ref={picker}
                selectedValue={language}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) =>
                    setLanguage(itemValue)
                    //console.log(picker.current)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default SearchByIngredientsScreen
