import React, {useState} from 'react';
import {
  ImageBackground,
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  SafeAreaView,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import backgroundImage from '../assets/images/aperitif-1246311_640.jpg';
import backgroundImageTwo from '../assets/images/eve-1071355_640.jpg';
import colors from '../constants/colors';

export default function WelcomeModal() {
  const [screenOne, setScreenOne] = useState(true);
  const [screenTwo, setScreenTwo] = useState(false);
  const [userName, setUserName] = useState();
  const [bgImage, setBgImage] = useState(backgroundImage);
  const [modalVisibility, setModalVisibility] = useState(true);
  return (
    <SafeAreaView>
      <Modal visible={modalVisibility}>
        <ImageBackground
          resizeMode="cover"
          source={bgImage}
          style={styles.bgTopImage}
          imageStyle={{
            // borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <LinearGradient
            colors={['rgba(000, 000, 000, 0.9)', 'rgba(400, 000, 000,0.3)']}
            style={styles.overlay}>
            <View
              style={styles.container}
              onPress={() => {
                Keyboard.dismiss;
              }}>
              {screenOne && (
                <>
                  <Text style={styles.tagLine}>Welcome To</Text>
                  <Text style={styles.title}>Minibar</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setScreenTwo(true);
                      setScreenOne(false);
                      setBgImage(backgroundImageTwo);
                    }}>
                    <Text style={styles.buttonText}>START</Text>
                  </TouchableOpacity>
                </>
              )}
              {screenTwo && (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View>
                    <Text style={styles.tagLine}>
                      {userName == null ? 'What is your name ?' : 'Welcome'}
                    </Text>
                    <Text style={styles.title}>
                      {' '}
                      {userName ? userName : null}
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      value={userName}
                      style={styles.textInput}
                      textAlign="center"
                      onChangeText={(text) => setUserName(text)}
                    />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        AsyncStorage.setItem('test5NewUser', userName).then(
                          () => {
                            setModalVisibility(false);
                          },
                        );
                      }}>
                      <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <Text style={styles.footerText}>Developed By GoWave</Text>
          </LinearGradient>
        </ImageBackground>
      </Modal>
      <StatusBar barStyle="dark-light" backgroundColor={colors.black} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  bgTopImage: {
    height: Dimensions.get('window').height,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginLeft: 80,
    marginRight: 80,
    margin: 10,
    borderRadius: 25,
    padding: 5,
    elevation: 5,
  },
  buttonText: {
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  footerText: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    elevation: 15,
    bottom: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(000, 000, 000,0.5)',
  },
  tagLine: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Light',
    elevation: 15,
  },
  textInput: {
    // backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    marginLeft: 80,
    marginRight: 80,
    marginTop: 30,
    borderRadius: 25,
    padding: 5,
    fontFamily: 'Poppins-Light',
    color: colors.white,
  },
  title: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 50,
    fontFamily: 'Lobster-Regular',
    elevation: 15,
  },
});
