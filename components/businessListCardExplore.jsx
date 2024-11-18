import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";

function BusinessListCardExplore ({business}) {

    const router = useRouter();

    return (

        <TouchableOpacity
            style={styles.container}
            onPress={() => {router.push(`businessDetails/${business.item.id}`)} }
        >
            <Image source={{uri: business.item.imageUrl}} style={styles.image}/>
            <Text style={styles.brandName}>{business.item.name}</Text>
            <Text style={styles.address}>{business.item.address}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    container: {
        marginVertical: 30,
        marginHorizontal: 30,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 15,
        marginBottom: 15,
    },
    brandName: {
        fontSize: 18,
        fontFamily: 'outfit',
    },
    address: {
        fontSize: 16,
        fontWeight: '400',
        color: 'gray',
    }
}

export default BusinessListCardExplore ;
