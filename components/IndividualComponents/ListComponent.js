import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import {Icon} from 'react-native-elements';
import colors from '../../constants/colors';

export default function ListComponent({name}) {
    return (
        <View style={styles.container}>
            <Image
            resizeMode="cover"
            source={{uri: 'https://www.wine-searcher.com/images/producer/30/00105330-1-3.jpg'}}
            style={styles.image}   
            />
            <View>
            <Text style={styles.text}>
            {name}
            </Text>
            <Text style={styles.para}>
                    Price : 250 /-
            </Text>
            <Text style={styles.para}>
                    Category : Wine
            </Text>
            </View>
            <Icon
            name="plus-square"
            type="font-awesome"
            color="grey"
            size={30}
            />
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: 10,
    padding: 15,
    borderRadius: 5,
    elevation: 5,
    
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 5
    },
    para: {
       fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 2 
    },
    text: {
        fontFamily: 'Poppins-Light',
        fontSize: 18,
        textTransform: 'uppercase',
        letterSpacing: 2
    },
});