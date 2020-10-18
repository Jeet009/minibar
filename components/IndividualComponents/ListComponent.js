import React, {useState, useEffect} from 'react'
import { Image, StyleSheet, Text, View, AsyncStorage } from 'react-native'
import {Icon} from 'react-native-elements';
import colors from '../../constants/colors';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';


export default function ListComponent({ name, id, price, category }) {
  const [userData, setUserData] = useState()
  const [cartData, setCartData] = useState()
  const navigation = useNavigation();

  // Getting User Data From Local Storage 
  useEffect(() => {
    AsyncStorage.getItem('test5NewUser').then((data) => {
        setUserData(JSON.parse(data));
        // Fetching Cart Data
        const subscriber = firestore()
        .collection('cart')
        .where('customer_phoneNo', '==', JSON.parse(data).userPhoneNo)
        .onSnapshot((querySnapshot) => {
          const dataArray = [];
          querySnapshot.forEach((documentSnapshot) => {
             dataArray.push(documentSnapshot.data().product_id);
           });
            setCartData(dataArray);
            console.log(dataArray)
        });
        return () => subscriber();
    });
  }, [setUserData, setCartData]);
  
  
    
  //   Handling Cart Addition   
  const handleCartAddition = (name, id, price, category) => {
    firestore().collection('cart').add({
        product_name: name,
        customer_name: userData.userName,
        customer_phoneNo: userData.userPhoneNo,
        product_id: id,
        product_price: price,
        product_category: category
    }).then(() => {
        console.log('Added To Cart')
    })  
    }
    
    
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
                    Price : {price} /-
            </Text>
            <Text style={styles.para}>
                    Category : {category}
            </Text>
            </View>
            {
                cartData && cartData.includes(id) ? (
                    <Icon
                    name="shopping-bag"
                    type="font-awesome"
                    color="grey"
                    size={30}
                    onPress={() => {navigation.navigate('Cart')}}
                    /> 
                ) : (
                      
                    <Icon
                    name="plus-square"
                    type="font-awesome"
                    color="grey"
                    size={30}
                    onPress={() => handleCartAddition(name, id, price, category)}
                    />
                )
            }
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