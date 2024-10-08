import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ListComponent from '../components/IndividualComponents/ListComponent';
import colors from '../constants/colors';
import firestore from '@react-native-firebase/firestore';


export default function ProductScreen({route}) {
  const [product, setProduct] = useState([]);
  
  useEffect(() => {
    const subscriber = firestore()
            .collection(route.params.productList.toString())
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
      <ListComponent
        name={itemData.item.name}
        id={itemData.item.key}
        price={itemData.item.price}
        category={itemData.item.category}
        imgUrl={itemData.item.imgUrl}
      />
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