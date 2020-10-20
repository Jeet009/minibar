import React, {useState} from 'react'
import { Text, View, SafeAreaView, StatusBar, Modal , StyleSheet, TouchableOpacity, TextInput, CheckBox, Dimensions} from 'react-native';
// import {  } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';


export default function OrderConfirmModal({ products, totalPrice, totalQuantity, userData }) {
    const [modalVisibility, setModalVisibility] = useState(true);
    const [confirmStep, setConfirmStep] = useState(false);
    const [checkBoxSelected, setCheckBoxSelected] = useState(false);
    const [address, setAddress] = useState();
    const [pincode, setPincode] = useState();
    const [name, setName] = useState(userData.userName);
    const [phone, setPhone] = useState(userData.userPhoneNo);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [text, setText] = useState('Placing Order ...');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigation = useNavigation();


    const handleOrderConfrim = () => {
        setPlacingOrder(true);
        firestore().collection('orders').add({
            products: JSON.stringify(products),
            totalPrice: totalPrice,
            totalQuantity: totalQuantity,
            customerName: name,
            customerPhoneNo: phone,
            address: address,
            pincode: pincode,
            isAdult : checkBoxSelected

        }).then(() => {
            setText('Order Placed! We will get back to you soon.');
            setOrderPlaced(true);
        }).catch((err) => {
            setText('Something Went Wrong! Try Again.')
        })  
    }
    return (
    <SafeAreaView>
      {!placingOrder && <Modal visible={modalVisibility}>
        {
          !confirmStep && <LinearGradient colors={[colors.darkPrimary, '#fff']}
           style={styles.linearBg}>
           <View style={styles.container}>
                <View style={styles.borderBottom}>
                    <Text style={styles.para}>Order Details - </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>Products : </Text>
                        <Text style={styles.para}>{JSON.stringify(products)}</Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Total Price : </Text>
                        <Text style={styles.para}>{totalPrice}</Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Total Quantity : </Text>
                        <Text style={styles.para}>{totalQuantity}</Text>
                    </View>  
                </View>
                <View style={styles.borderBottom}>
                    <Text style={styles.para}>Your Details - </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>Name : </Text>
                        <Text style={styles.para}>{userData.userName}</Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Phone Number : </Text>
                        <Text style={styles.para}>{userData.userPhoneNo}</Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
        }  
        {
          confirmStep && <LinearGradient colors={[colors.darkPrimary, '#fff']}
           style={styles.linearBg}>
           <View style={styles.container}>
                    <Text style={styles.para}>Personal Details - </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>Name : </Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={styles.textInput}
                            disable={true}
                        />
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Phone Number : </Text>
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.textInput}
                            maxLength={10}
                        />
                    </View>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: 0.5, marginTop: 20}}></View>
                    <Text style={styles.para}>Address & Other Details - </Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>Address : </Text>
                        <TextInput
                            value={address}
                            onChangeText={setAddress}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Pincode : </Text>
                        <TextInput
                            value={pincode}
                            onChangeText={setPincode}
                            style={styles.textInput}
                            maxLength={6}
                        />
                    </View>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: 0.5, marginTop: 20}}></View>
                    <View style={styles.view}>
                        <Text style={styles.text}>I'm 18 Years Old : </Text>
                        <CheckBox
                          value={checkBoxSelected}
                          onValueChange={setCheckBoxSelected}
                            // style={styles.textInput}
                        />
                    </View>
                </View>
        </LinearGradient>          
        }        
            <TouchableOpacity style={styles.buttonWhite} onPress={() => {setModalVisibility(false)}}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>  
            { !confirmStep &&
            <TouchableOpacity style={styles.buttonBg} onPress={() => {setConfirmStep(true)}}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            }  
            {
            confirmStep && checkBoxSelected && <TouchableOpacity style={styles.buttonBg} onPress={handleOrderConfrim}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>          
            }
      </Modal>}
      {
        placingOrder && <Modal visible={modalVisibility}>
           <LinearGradient colors={[colors.darkPrimary, '#fff']}
                        style={styles.linearBg}>
                    <View style={{justifyContent: 'center', flex: 1}}>
                            <Text style={styles.textWhite}>{text}</Text>
                            {orderPlaced && <TouchableOpacity style={styles.buttonBg} onPress={() => {navigation.navigate('Home'), setModalVisibility(false)}}>
                              <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                            }
                   </View>    
           </LinearGradient> 
         </Modal>       
      }
      <StatusBar barStyle="dark-light" backgroundColor={colors.primary} />
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearBg: {
    flex: 1,
    },
    borderBottom: {
        // width: Dimensions.get('window').width,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.black,
        paddingBottom: 10,
        alignSelf: 'flex-start',
        // backgroundColor: 'black'
    },
    buttonBg: {
        backgroundColor: colors.lightPrimary,
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        elevation: 5,
        // borderRadius: 35
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5
    }, 
    buttonWhite: {
        backgroundColor: colors.darkPrimary,
        position: 'absolute',
        top: 10,
        // left: 5,
        right: 10,
        elevation: 5,
    }, 
    buttonText: {
        textAlign: 'center',
        margin: 20,
        fontFamily: 'Poppins-Light',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: 'white'
    },
    container: {
    flex: 1,
    // justifyContent: 'center',
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    paddingTop: 50,
    backgroundColor: colors.white,
    margin: 10,
    padding: 15,
    borderRadius: 5,
    elevation: 5,
    },
    para: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 2 
    },
    
    text: {
        fontFamily: 'Poppins-Light',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    textWhite: {
        fontFamily: 'Poppins-Light',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: colors.white,
        textAlign: 'center',
        fontSize: 20
    },
    textInput: {
    borderColor: colors.ypsDark,
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 15,
    // fontWeight: 'bold',
    // backgroundColor: colors.lightPrimary,
    width: Dimensions.get('window').width / 2,
    paddingLeft: 20,
    fontFamily: 'Poppins-Light',
    },
    view: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection: 'row',
    marginTop: 5,
    
    }
});