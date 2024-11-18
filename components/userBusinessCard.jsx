import React from 'react';
import {Text, View, Image} from 'react-native';
import {TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";

function UserBusinessCard ({business}) {

    const router = useRouter();

    return (
        <TouchableOpacity style={styles.container}
                          onPress={()=> {router.push(`businessDetails/${business.id}`)}}

        >
            <Image style={styles.image} source={{uri: business.imageUrl}} />
            <Text style={styles.name}>{business.name}</Text>
            <Text style={styles.address}>{business.address}</Text>
        </TouchableOpacity>

    );
}

const styles = {
    container: {
      marginVertical: 20,
        borderRadius: 20,
        padding: 15,
        borderColor: 'gray',
        backgroundColor: '#eae5e5',
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 15,
        marginBottom: 15
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'outfit',
    },
    address: {
        fontSize: 15,
        fontWeight: 600,
        fontFamily: 'outfit',
        color: 'gray'
    }
}

export default UserBusinessCard ;
