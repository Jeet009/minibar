import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, StatusBar, AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';
import bgTopImage from '../assets/images/red-wine-2443699_640.jpg';
import BackgroundImageComponent from '../components/IndividualComponents/BackgroundImageComponent';
import WelcomeModal from './WelcomeModal';

export default function HomeScreen() {
  const [newUser, setNewUser] = useState(true);
  const [userName, setUserName] = useState();
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
      </LinearGradient>
      {newUser && <WelcomeModal />}
      <StatusBar barStyle="dark-light" backgroundColor={colors.black} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  linearBg: {
    flex: 1,
    paddingBottom: 20,
  },
});
