import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, StatusBar, AsyncStorage, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';
import bgTopImage from '../assets/images/red-wine-2443699_640.jpg';
import alcoholic from '../assets/images/alocoholic.jpg';
import nonalcoholic from '../assets/images/non-alcoholic.jpg';
import BackgroundImageComponent from '../components/IndividualComponents/BackgroundImageComponent';
import WelcomeModal from './WelcomeModal';
import BoxComponent from '../components/IndividualComponents/BoxComponent';
import FloatingButton from '../components/IndividualComponents/FloatingButton';

export default function HomeScreen() {
  const [newUser, setNewUser] = useState(true);
  const [userName, setUserName] = useState();
  //Parent Type
  const parent_type = [
  {
    name: 'Alcoholic \n Beverage',
    image: alcoholic
  },
  {
    name: 'Non-Alcoholic \n Beverage',
    image: nonalcoholic
  }
  ]
  let tagLine = userName ? 'Ciao, ' + userName : 'Looking For Something ?';
  useEffect(() => {
    AsyncStorage.getItem('test5NewUser').then((data) => {
      setUserName(data);
      data == null ? setNewUser(true) : setNewUser(false);
    });
  }, [setNewUser, setUserName]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={[colors.lightPrimary, '#fff']}
        style={styles.linearBg}>
        <BackgroundImageComponent
          image={bgTopImage}
          title="Minibar"
          tagLine={tagLine}
        />
        <View style={styles.boxContainer}>
          {parent_type.map((data) => (
            <TouchableHighlight>
              <BoxComponent name={data.name} image={data.image} />
            </TouchableHighlight>
          ))}
        </View>
      </LinearGradient>
      {newUser && <WelcomeModal />}
      <FloatingButton />
      <StatusBar barStyle="dark-light" backgroundColor={colors.black} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  linearBg: {
    flex: 1,
  },
});
