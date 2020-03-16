import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DefaultText from './DefaultText'
import Colors from '../constants/Colors'
import { normalizeFontSize, normalizeBorderRadiusSize } from '../methods/normalizeSizes'


const MealTags = (props) => {
    const {tags} = props
    const renderTags = () => {
        if (tags) {
            return tags.map((item, index) => index < 3 ? <View style={styles.tagContainer} key={index}><DefaultText style={styles.tagLabel}>{item}</DefaultText></View> : null)
        } else {
            return;
        }
    }
    return (
        <View style={styles.tagsContainer}>
            {renderTags()}
        </View>
    )
}

const styles = StyleSheet.create({
    tagContainer: {
        borderRadius: normalizeBorderRadiusSize(50) ,
        backgroundColor: Colors.lighterGray,
        marginHorizontal: normalizeFontSize(10),
        paddingHorizontal: normalizeFontSize(10),
        paddingVertical: normalizeFontSize(5),
    },
    tagLabel: {
        color: Colors.darkGray,
        textAlign: 'center',
    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
})

export default MealTags
