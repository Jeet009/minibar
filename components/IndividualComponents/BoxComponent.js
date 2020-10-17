import React from 'react'
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';


export default function BoxComponent({name, image, bottomText, nestedText, title, type, navigationPath}) {
    const navigation = useNavigation();
    return (
        <View style={bottomText ? styles.whiteBg : styles.whiteBgN}>
            {bottomText &&
            <TouchableOpacity style={styles.touchO} onPress={() => {
              navigation.navigate(navigationPath, {
                title: title,
                image: image,
                type: type
            })}}>
            <ImageBackground
            resizeMode="cover"
            source={image}
            style={styles.bgTopImage}
            imageStyle={{
                borderBottomWidth: 3
            }}
            />
            <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>}
            {nestedText && <>
            <ImageBackground
            resizeMode="cover"
            source={{uri: image}}
            style={styles.bgTopImage}
            imageStyle={{
                borderBottomWidth: 3
            }}>
                    <View style={styles.overlay}>
                        <Text style={styles.textN}>{name}</Text>      
                    </View>
            
            </ImageBackground>
            </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    bgTopImage: {
        flex: 1,  
    },
    touchO: {
    flex: 1,
    },
    overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(000, 000, 000,0.7)',
    },
    whiteBg: {
        height: Dimensions.get('window').height / 3,
        backgroundColor: 'white',
        marginTop: 15,
        elevation: 2,
        borderRadius: 5,
        overflow: "hidden"
    },
    whiteBgN: {
        height: Dimensions.get('window').height / 4,
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
    },
    textN: {
        textAlign: 'center',
        fontFamily: 'Lobster-Regular',
        color: colors.white,
        fontSize: 25
    }
});