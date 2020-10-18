import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';

export default function SearchScreen() {
  return (
    <LinearGradient colors={[colors.darkPrimary, '#fff']}
                style={styles.linearBg}>

    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  
  linearBg: {
    flex: 1,
  },
});