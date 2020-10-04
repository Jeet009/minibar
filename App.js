import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import colors from './constants/colors';
import Navigation from './routes/Navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      {/* <Text>Hello</Text> */}
    </SafeAreaView>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
