import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";
import PopularBusinessCard from "./popularBusinessCard";

function Slider() {

    const [businessList, setBusinessList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getBusinessList();
    }, [])

    const getBusinessList = async () => {
        setIsLoading(true);
        setBusinessList([]);
        const q = query(collection(db, "BusinessList"));
        const querySnapshot = await getDocs(q);

        querySnapshot.docs.forEach(doc => {
            setBusinessList((prev) => [...prev, {id: doc.id, ...doc.data()}]);

        })
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                #For you
            </Text>

            {isLoading ? <ActivityIndicator color={"gray"}  size={"large"}  /> :  <FlatList
                data={businessList}
                horizontal={true}
                style={styles.list}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item,index })=>(
                    <PopularBusinessCard businessDetail={item} key={index}/>
                )}
            />}

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    text: {
        padding: 10,
        fontSize: 18,
        fontFamily: 'outfit',
        fontWeight: 'bold',
    },
    list: {
        marginHorizontal: 15,
    }
})
export default Slider;
