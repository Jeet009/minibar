import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import colors from '../../constants/colors';
import SearchBarComponent from './SearchBarComponent';
export default function BackgroundImageComponent({image, title, tagLine}) {
  return (
    <ImageBackground
      resizeMode="cover"
      source={image}
      style={styles.bgTopImage}
      imageStyle={{
        // borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tagLine}>{tagLine}</Text>
        <SearchBarComponent />

        <Text style={styles.para}>Developed By Arnab Mondal</Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bgTopImage: {
    height: Dimensions.get('window').height / 2,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(000, 000, 000,0.7)',
    borderBottomRightRadius: 20,
  },
  tagLine: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Light',
    elevation: 15,
  },
  title: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 50,
    fontFamily: 'Lobster-Regular',
    elevation: 15,
  },
  para: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    elevation: 15,
    textTransform: 'uppercase',
    letterSpacing: 1.5
  }
});
