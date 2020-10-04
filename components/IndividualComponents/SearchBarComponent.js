import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

export default function SearchBarComponent() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.searchBar}
      onPress={() => {
        navigation.push('Search');
      }}>
      <Text style={styles.text}>Search ...</Text>
      <Icon
        name="search"
        type="font-awesome"
        color="grey"
        style={styles.icon}
        size={20}
      />
    </TouchableOpacity>
  );
}
//  useNavigation(SearchBarComponent);
const styles = StyleSheet.create({
  icon: {fontFamily: 'Poppins-Light', marginRight: 15},
  linearBg: {
    flex: 1,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin:
      Dimensions.get('window').width - (Dimensions.get('window').width - 30),
    padding: 10,
    borderRadius: 25,
  },
  text: {
    color: colors.ypsDark,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 15,
  },
});
