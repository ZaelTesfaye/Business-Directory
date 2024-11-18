import React, {useEffect, useState} from 'react';
import {
    Alert,
    Image,
    Linking,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import {useLocalSearchParams, useRouter} from "expo-router";
import {deleteDoc, doc, getDoc} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";
import About from "../../components/About/About";
import Reviews from "../../components/About/Reviews";
import {useUser} from "@clerk/clerk-expo";

function BusinessId() {
    const [businessDetail, setBusinessDetail] = useState({});
    const [owner, setOwner] = useState(false);
    const {businessId} = useLocalSearchParams();


    const {user} = useUser();
    const router = useRouter();

    useEffect(() => {
        getBusinessDetails();
    }, [])

    const getBusinessDetails = async () => {
        setBusinessDetail({});
        const docRef = doc(db, "BusinessList", businessId)
        const docSnap = await getDoc(docRef);

        setBusinessDetail({id: docSnap.id, ...docSnap.data()});

        if (user?.primaryEmailAddress.emailAddress === docSnap.data().userEmail) {

            setOwner(true);
        }
    }

    const onDelete = async () => {
        Alert.alert("Would you like to delete this item?",
            "Are you sure you want to delete this item? Tha action cant be reversed.", [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteItem(),
                },
            ])
    }

    const deleteItem = async () => {

        await deleteDoc(doc(db, "BusinessList", `${businessId}`));

        ToastAndroid.show("Item deleted", ToastAndroid.BOTTOM)
        router.back();

    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{uri: businessDetail.imageUrl}} style={styles.image}/>
            <View style={styles.textContainer}>
                <View style={styles.row}>
                    <Text style={styles.brandName}>{businessDetail.name}</Text>
                    {owner && <TouchableOpacity onPress={onDelete}>
                        <Image source={require("../../assets/images/delete.png")} style={styles.deleteIcon}/>
                    </TouchableOpacity>}
                </View>

                <Text style={styles.address}>{businessDetail.address}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}
                                  onPress={() => {
                                      Linking.openURL(`tel:${businessDetail.contact}`)
                                  }}>
                    <Image source={require("../../assets/images/phone-call.png")} style={styles.buttonIcons}/>
                    <Text style={{fontFamily: "outfit"}}>Call</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Linking.openURL(`https://www.google.com/maps/search/?api=l&query=${encodeURIComponent(businessDetail.address)}`)
                    }}
                >
                    <Image source={require("../../assets/images/placeholder.png")} style={styles.buttonIcons}/>
                    <Text style={{fontFamily: "outfit"}}>Location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={() => {
                                      Linking.openURL(businessDetail.website)
                                  }}>
                    <Image source={require("../../assets/images/internet.png")}
                           style={styles.buttonIcons}/>
                    <Text style={{fontFamily: "outfit"}}>Web</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={() => {
                                      Share.share({
                                          message: businessDetail.name + "\nAddress:" + businessDetail.address,
                                      })
                                  }}
                >
                    <Image source={require("../../assets/images/next.png")} style={styles.buttonIcons}/>
                    <Text style={{fontFamily: "outfit"}}>Share</Text>
                </TouchableOpacity>
            </View>
            <About details={businessDetail}/>
            <Reviews details={businessDetail}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            marginTop: 40
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 25
        },
        image: {
            width: '100%',
            height: 250,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,

        },
        deleteIcon: {
            width: 27,
            height: 27,
        },
        button: {
            alignItems: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            paddingHorizontal: 45,
            justifyContent: 'space-between',
            paddingVertical: 30,
        },
        buttonIcons: {
            width: 40,
            height: 40,
        },
        brandName: {
            fontSize: 17,
            fontWeight: 'bold',
            fontFamily: 'outfit',
        },
        address: {
            color: 'gray',
            fontWeight: 'medium',
        },
        textContainer: {
            paddingLeft: 20,
            paddingTop: 10,
        }

    })

export default BusinessId;
