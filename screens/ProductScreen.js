import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ListComponent from '../components/IndividualComponents/ListComponent';
import colors from '../constants/colors';
import firestore from '@react-native-firebase/firestore';


export default function ProductScreen({route}) {
  const [product, setProduct] = useState([])
  useEffect(() => {
    const subscriber = firestore()
            .collection('productListOne')
            .where('category', '==', route.params.dbParam)
            .onSnapshot((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((documentSnapshot) => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setProduct(data);
                // console.log(data);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
  }, [setProduct])
  function renderResult(itemData) {
    return (
      <ListComponent name={itemData.item.name} />
    )
  }
  return (
    <LinearGradient
      colors={[colors.darkPrimary, '#fff']}
      style={styles.linearBg}>
      
      <FlatList
      numColumns={1}
      data={product}
      renderItem={renderResult}
      />
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearBg: {
    flex: 1,
  },
});