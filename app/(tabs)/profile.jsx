import React from 'react';
import {Image, ScrollView, Share, Text, TouchableOpacity, View} from 'react-native';
import {useAuth, useUser} from "@clerk/clerk-expo";
import {Colors} from "../../constants/Colors";
import {useRouter} from "expo-router";

function Profile() {

    const {user} = useUser();
    const router = useRouter();
    const {signOut} = useAuth();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.profile}>
                <Image source={{uri: user?.imageUrl}} style={styles.image}/>
                <Text style={styles.name}>{user?.fullName}</Text>
                <Text style={styles.email}>{user?.primaryEmailAddress.emailAddress}</Text>
            </View>

            <View>
                <View style={styles.optionsContainer}>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.buttons} onPress={() => {
                            router.push('/business/add-business')
                        }}>
                            <Text style={styles.buttonText}> Add Business </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttons} onPress={() => {
                            router.push('/business/user-business')
                        }}>
                            <Text style={styles.buttonText}> My Business </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>

                        <TouchableOpacity style={styles.buttons} onPress={() => {
                            Share.share({
                                message: "Download the Business Directory App: http://localhost:8080",
                                url: "http://localhost:8080"
                            })
                        }}>
                            <Text style={styles.buttonText}> Share App </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttons} onPress={() => {
                            signOut();
                        }}>
                            <Text style={styles.buttonText}> Logout </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>

    );
}

const styles = {
    buttonText: {
        numberOfLines: 1,
    },
    buttons: {
        width: 170,
        padding: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.Primary,
        alignItems: 'center',
        justifyContent: 'center',

    },
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'outfit',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'outfit',
    },
    email: {
        fontWeight: '500',
        color: 'gray',
    },
    profile: {
        paddingTop: 80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    optionsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        gap: 20,

    },
    row: {
        flexDirection: 'row',
        gap: 20,

    }
}

export default Profile;
