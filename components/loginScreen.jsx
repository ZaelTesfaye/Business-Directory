import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {userWarmUpBrowser} from "../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import {useOAuth} from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

function LoginScreen() {
    userWarmUpBrowser();

    const {startOAuthFlow} = useOAuth({strategy: "oauth_google"})

    const onPress = React.useCallback(async () => {
        try {
            const {createdSessionId, signIn, signUp, setActive} = await startOAuthFlow();
            if (createdSessionId) {
                setActive({session: createdSessionId});

            } else {

            }
        } catch (err) {
            console.log(err);
        }
    },[]);


    return (
        <View>
            <View style={styles.container}>
                <Image source={require('./../assets/images/login.png')}
                       style={styles.image}/>
            </View>

            <View style={styles.textContainer}>

                <Text style={styles.mainText}>
                    The Ultimate
                    <Text style={styles.brightText}> Business Directory </Text>
                    App. Find Businesses easily.
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onPress} style={styles.touchable}>
                    <Text style={{fontSize: 16 ,  color: "#fff"}}>Login with google</Text>
                </TouchableOpacity >
            </View>
        </View>

    );
}

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 80,

    },
    image: {
        height: 500,
        width: 250,
        resizeMode: "cover",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#2b57c2",
    },
    textContainer: {


        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 30,

    },
    mainText: {

        fontSize: 20,
        fontWeight: "bold",
        justifyContent: 'center',
        textAlign: 'center'
    },

    brightText: {
        color: "#0449e8",
    },
    buttonContainer: {

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,

    },
    touchable: {
        backgroundColor: "#053aee",
        padding: 12,
        paddingHorizontal: 80,
        borderRadius: 10,
        color: "#fff",
        fontFamily: "outfit",
    },



})
