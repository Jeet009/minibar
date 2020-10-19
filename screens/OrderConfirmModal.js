import React, {useState} from 'react'
import { Text, View, SafeAreaView, StatusBar, Modal , StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';

export default function OrderConfirmModal({ products, totalPrice, totalQuantity, userData }) {
    const [modalVisibility, setModalVisibility] = useState(true);
    const [confirmStep, setConfirmStep] = useState(false)
    return (
    <SafeAreaView>
      <Modal visible={modalVisibility}>
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
            <TouchableOpacity style={styles.buttonWhite} onPress={() => {setModalVisibility(false)}}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>  
            { !confirmStep &&
            <TouchableOpacity style={styles.buttonBg} onPress={() => {setConfirmStep(true)}}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            }  
            {
            confirmStep && <TouchableOpacity style={styles.buttonBg} onPress={() => {setModalVisibility(false)}}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>          
            }
      </Modal>
      <StatusBar barStyle="dark-light" backgroundColor={colors.primary} />
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    linearBg: {
    flex: 1,
    },
    borderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.black,
        paddingBottom: 10,
        alignSelf: 'flex-start'
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
    justifyContent: 'center',
    // flexDirection: 'row',
    alignItems: 'center',
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
    view: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    flexDirection: 'row',
    }
});