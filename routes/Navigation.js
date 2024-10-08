import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import CategoryScreen from '../screens/CategoryScreen';
import colors from '../constants/colors';

// const AppContainer = createStackNavigator({
//   'Home Screen': HomeScreen,
//   'Product Screen': ProductScreen,
// });

// export default createAppContainer(AppContainer);

const Stack = createStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Product" component={ProductScreen}
        options={{
            title: 'Choose Product',
            headerStyle: { backgroundColor: colors.black },
            headerTintColor: colors.white,
            headerTitleStyle: {
              fontFamily: 'Poppins-Light',
              textTransform: 'uppercase',
              fontSize: 15,
              color: colors.white
            },
          }}
        />
        <Stack.Screen name="Cart" component={CartScreen} 
          options={{
            title: 'Your Bag',
            headerStyle: { backgroundColor: colors.black },
            headerTintColor: colors.white,
            headerTitleStyle: {
              fontFamily: 'Poppins-Light',
              textTransform: 'uppercase',
              fontSize: 15,
              color: colors.white
            },
          }}
        />
        <Stack.Screen name="Category" component={CategoryScreen}
          options={{
            title: 'Select Category',
            headerStyle: { backgroundColor: colors.black },
            headerTintColor: colors.white,
            headerTitleStyle: {
              fontFamily: 'Poppins-Light',
              textTransform: 'uppercase',
              fontSize: 15,
              color: colors.white
            },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
