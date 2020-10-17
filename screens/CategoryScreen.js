import React, { useEffect, useState } from 'react'
import {View, Text, StatusBar, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BoxComponent from '../components/IndividualComponents/BoxComponent';
import colors from '../constants/colors';
import firestore from '@react-native-firebase/firestore';
export default function CategoryScreen({ route }) {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const subscriber = firestore()
            .collection('categories')
            .where(route.params.type, '==', true)
            .onSnapshot((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((documentSnapshot) => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setCategory(data);
                console.log(data);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, [setCategory]);

    function renderResult(itemData) {
        return (
            <View style={styles.boxContainer}>
                <BoxComponent
                nestedText={true}
                bottomText={false}
                name={itemData.item.name}
                image={itemData.item.imgUrl} />
            </View>
        )
    }
    return (
    <>
        <LinearGradient colors={[colors.darkPrimary, '#fff']}
                style={styles.linearBg}>
               
                <FlatList
                    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5,  }}
                    ListHeaderComponent={
                    <View style={styles.topBgContainer}>
                    <BoxComponent name={route.params.title} image={route.params.image} nestedText={false} bottomText={true} />
                    </View>
                    }
                    numColumns={3}
                    data={category}
                    renderItem={renderResult}
                />
        </LinearGradient>
        {/* <StatusBar barStyle="dark" backgroundColor={colors.white} /> */}
    </>
    )
}

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    margin: 5
  },
  linearBg: {
    flex: 1,
  },
    topBgContainer: {
        margin: 5
    }
});