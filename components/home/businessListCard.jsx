import React from 'react';
import {Text, View, Image} from 'react-native';
import {TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";

function BusinessListCard ({business}) {

    const router= useRouter();

    return (
        <TouchableOpacity style={styles.container} onPress={() => {router.push(`/businessDetails/${business.id}`)}} >

            <Image source={{uri: business.imageUrl}} style={styles.image}/>
            <View>
                <Text style={styles.brandName}>{business.name}</Text>
                <Text style={styles.address}>{business.address}</Text>
            </View>

        </TouchableOpacity>
    );
}

const styles = {
        container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        padding: 15
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    brandName: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'outfit',
    },
    address: {
        color: "gray"
    }
}

export default BusinessListCard ;
