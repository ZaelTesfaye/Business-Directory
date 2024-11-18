import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View, StatusBar } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/home/category";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import BusinessListCardExplore from "../../components/businessListCardExplore";

function Explore() {
    const [categorySelected, setCategorySelected] = React.useState();
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        getBusinessList();
    }, [categorySelected]);

    const getBusinessList = async () => {
        setBusinessList([]);
        const q = query(collection(db, "BusinessList"), where("category", "==", categorySelected));
        const querySnapshot = await getDocs(q);

        querySnapshot.docs.forEach(doc => {
            setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
        });
    };

    return (
        <View style={styles.container}>

            <StatusBar backgroundColor="#0b41c5" barStyle="light-content" />

            <View style={styles.buttonContainer}>
                <Ionicons name="search" size={24} color={Colors.Primary} />
                <TextInput style={styles.input} placeholder={"Business Name"} />
            </View>
            <Category ShowText={false} setCategorySelected={setCategorySelected} />
            <View>
                <FlatList
                    data={businessList}
                    renderItem={({ item, index }) => (
                        <BusinessListCardExplore business={item} key={index} />
                    )}
                />
            </View>
        </View>
    );
}

const styles = {
    container: {
        paddingTop: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: "#fff",
        color: "fff",
        padding: 10,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.Primary,
    },
    input: {
        fontFamily: "outfit",
    }
};

export default Explore;
