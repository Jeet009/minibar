import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, AsyncStorage, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';
import firestore from '@react-native-firebase/firestore';
import { Icon } from 'react-native-elements';
import FloatingButton from '../components/IndividualComponents/FloatingButton'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import OrderConfirmModal from './OrderConfirmModal';


export default function SearchScreen() {
  
  const [cartData, setCartData] = useState();
  const [userData, setUserData] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [services, setServices] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false)


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
           dataArray.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
           });
          });
          setCartData(dataArray);

          // Cart Algorithm
          let totalP = 0;
          let totalQ = 0;
          let serviceArray = [];
          dataArray.forEach((data) => {
            serviceArray.push(data.product_name);
            totalQ = totalQ + parseInt(data.quantity);

            if (parseInt(data.quantity) > 1) {
              totalP = totalP + parseInt(data.product_price) * parseInt(data.quantity);
              setTotalPrice(totalP);
            } else {
              totalP = totalP + parseInt(data.product_price);
              setTotalPrice(totalP);
            }

            setTotalQuantity(totalQ);
            setServices(serviceArray);
          });
        });
        return () => subscriber();
    });
  }, [setCartData]);

  //Placing Order
  const handleOrderConfirm = () => {
    setShowOrderModal(!showOrderModal)
  }
  // Handling Delete

  const handleDelete = (id) => {
    firestore()
      .collection('cart')
      .doc(id)
      .delete()
  };


  // Handling Quantity
  const quantityDecrease = (id) => {
    if (totalQuantity > services.length) {
      firestore()
        .collection('cart')
        .doc(id)
        .update({
          quantity: firestore.FieldValue.increment(-1),
        });
    }
  };

  const quantityIncrease = (id) => {
    firestore()
      .collection('cart')
      .doc(id)
      .update({
        quantity: firestore.FieldValue.increment(1),
      });
  };

  function renderResult({ item }) {
    return (
      <View style={styles.container}>
        <Image
        resizeMode="cover"
        source={{uri: item.imgUrl}}
        style={styles.image}   
        />
        <View>
        <Text style={styles.text}>
        {item.product_name}
        </Text>
        <Text style={styles.para}>
                Price : {item.product_price} /-
        </Text>
        <View style={styles.quantity}>
        <Icon
          name="minus"
          type="font-awesome"
          color="grey"
          size={20}
          onPress={() => quantityDecrease(item.key)}
        />
            <Text>
              {item.quantity}
            </Text>
        <Icon
          name="plus"
          type="font-awesome"
          color="grey"
          size={20}
          onPress={() => quantityIncrease(item.key)}
        />
        </View>
        </View> 
        <Icon
          name="trash"
          type="font-awesome"
          color="grey"
          size={30}
          onPress={() => handleDelete(item.key)}
        />
      </View> 
    )
  }

  if (cartData)
  {
    if (cartData.length > 0) 
    {
      return (
    
      <LinearGradient colors={[colors.darkPrimary, '#fff']}
      style={styles.linearBg}>
          <FlatList
              numColumns={1}
              data={cartData}
              renderItem={renderResult}
              ListFooterComponent={
                <View style={styles.container}>
                  <View>
                    <Text style={styles.para}>Total Price : {totalPrice} / -</Text>
                    <Text style={styles.para}>Total Quantity : {totalQuantity}</Text>
                  </View>
                </View>
              }
          />
          <TouchableOpacity style={styles.buttonBg} onPress={() => handleOrderConfirm()}>
              {!showOrderModal && <Text style={styles.buttonText}>Place Order</Text>}
              {showOrderModal && <Text style={styles.buttonText}>Canceled, Try Again</Text>}
          </TouchableOpacity>  
          {showOrderModal && <OrderConfirmModal products={services} totalPrice={totalPrice} totalQuantity={totalQuantity} userData={userData} />}
      </LinearGradient>
   
    );  
    } else if (cartData.length == 0) {
    return (
      <LinearGradient colors={[colors.darkPrimary, '#fff']}
      style={styles.linearBg}>
        <Text style={styles.buttonText}>Your Bag Is Empty</Text>
      </LinearGradient>
   )
   }
  } else {
    return (
      <LinearGradient colors={[colors.darkPrimary, '#fff']}
      style={styles.linearBg}>
        <Text style={styles.buttonText}>Your Bag Is Empty</Text>
      </LinearGradient>
   )
  }
  
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
  quantity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
    },
  linearBg: {
    flex: 1,
  },
    
    text: {
        fontFamily: 'Poppins-Light',
        fontSize: 18,
        textTransform: 'uppercase',
        letterSpacing: 2
  },
    buttonBg: {
        backgroundColor: colors.lightPrimary,
        // position: 'absolute',
        bottom: 5,
        margin: 20,
        elevation: 5,
        borderRadius: 35
  },
    buttonText: {
        textAlign: 'center',
        margin: 15,
        fontFamily: 'Poppins-Light',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: 'white'
    }
});