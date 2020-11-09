import React, { useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native'
import colors from '../../constants/colors';

export default function FloatingButton() {
    const [buttonText] = useState('Incase of queries, Contact Us')
    const endingTouch = () => {
        Linking.openURL('https://wa.me/91967114040');
    }
    return (    
        <>
            <TouchableOpacity style={styles.bg} onPress={endingTouch}>  
            <Text style={styles.text}>{buttonText}</Text>
            </TouchableOpacity>
        </>       
    )
}
const styles = StyleSheet.create({
    bg: {
        backgroundColor: colors.lightPrimary,
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5,
        elevation: 5,
        borderRadius: 35
    }, 
    text: {
        textAlign: 'center',
        margin: 20,
        fontFamily: 'Poppins-Light',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: 'white'
    }
});