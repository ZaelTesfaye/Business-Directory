import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from "react-native";
import {TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";

function PopularBusinessCard({businessDetail}) {

    const router = useRouter();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={()=>{router.push("businessDetails/"+businessDetail.id)}}
        >
            <Image source={{uri: businessDetail.imageUrl}} style={styles.image} />
            <Text style={styles.brandName}>{businessDetail.name}</Text>
            <Text style={styles.address}>{businessDetail.address}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 150,
        borderRadius: 10,
    },
    container: {

        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#e0dcdc"
    },
    address: {
        color: "gray",
    },
    brandName: {
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "outfit",
    }
})


export default PopularBusinessCard;
