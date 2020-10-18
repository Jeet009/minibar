import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, StatusBar, AsyncStorage, View, TouchableOpacity} from 'react-native';
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
    title: 'Alcoholic Beverage',
    image: alcoholic,
    type: 'alcoholic'
  },
  {
    name: 'Non-Alcoholic \n Beverage',
    title: 'Non-Alcoholic Beverage',
    image: nonalcoholic,
    type: 'non-alcoholic'
  }
  ]
  let tagLine = userName ? 'Ciao, ' + userName : 'Looking For Something ?';
  useEffect(() => {
    AsyncStorage.getItem('test5NewUser').then((data) => {
      setUserName(JSON.parse(data).userName);
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
            <View style={styles.individualBox}>
              <BoxComponent
                name={data.name}
                image={data.image}
                type={data.type}
                title={data.title}
                nestedText={false}
                bottomText={true}
                navigationPath='Category' />
            </View>
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
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  individualBox: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 5
  },
  linearBg: {
    flex: 1,
  },
});
