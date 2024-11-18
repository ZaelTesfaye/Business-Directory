import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useUser} from '@clerk/clerk-expo';
import {Colors} from '../../constants/Colors';
import Ionicons from "@expo/vector-icons/Ionicons";

function Header() {

    const {user} = useUser();

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <View>
                    <Image style={styles.image} source={{uri: user?.imageUrl}}/>
                </View>

                <View>
                    <Text style={styles.text}>Welcome</Text>
                    <Text style={styles.largeText}>{user?.fullName}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Ionicons name="search" size={24} color={Colors.Primary}/>
                <TextInput style={styles.input} placeholder={"Business Name"}/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingTop: 50,
        width: '100%',
        gap: 10,
        backgroundColor: Colors.Secondary,
        flexDirection: 'column',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,

    },
    welcome: {
      flexDirection: 'row',
      gap: 16,

    },
    largeText: {
        fontSize: 17,
        fontFamily: "outfit",
        color: "white"
    },
    text: {
        color: "white"
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 99,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: "#fff",
        color: "fff",
        padding: 10,
        borderRadius: 99,
    },
    input: {
        fontFamily: "outfit",
    }
})

export default Header;

