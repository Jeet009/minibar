import React from 'react'
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native'

export default function BoxComponent({name, image}) {
    return (
        <View style={styles.whiteBg}>
            <ImageBackground
            resizeMode="cover"
            source={image}
            style={styles.bgTopImage}
            imageStyle={{
                borderBottomWidth: 3
            }}
            />
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bgTopImage: {
        flex: 1,  
    },
    whiteBg: {
        height: Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width / 2.1,
        backgroundColor: 'white',
        marginTop: 15,
        elevation: 2,
        borderRadius: 5,
        overflow: "hidden"
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        paddingBottom: 5,
        paddingTop: 5
    }
});