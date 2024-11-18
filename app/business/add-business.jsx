import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRouter} from "expo-router";
import {Colors} from "../../constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import {AdvancedImage, upload} from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";
import * as FileSystem from 'expo-file-system';
import { doc, setDoc } from "firebase/firestore";
import {useUser} from "@clerk/clerk-expo";
import {db} from "../../config/firebaseConfig";


const cld = new Cloudinary({
    cloud: {
        cloudName: 'demo'
    }
});

const options = {
    upload_preset: 'sample_preset',
    unsigned: true,
}

function AddBusiness() {
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessContact, setBusinessContact] = useState('');
    const [businessWebsite, setBusinessWebsite] = useState('');
    const [about, setAbout] = useState('');
    const [businessCategory, setBusinessCategory] = useState('');

    const navigation = useNavigation();
    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState();

    const {user} = useUser();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "Add Business"
        })
    })

    const onSubmit = async () => {
        cloudinaryUpload();
        uploadData();
    }

    const pickImage = async () => {

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImages([]);
            result.assets.forEach(asset => {
                setImages((prev) => [...prev, asset.uri]);
            })
        }
    }

    const cloudinaryUpload = async () => {

        if (images.length > 0) {

            const base64Img = await FileSystem.readAsStringAsync(images[0], {
                encoding: FileSystem.EncodingType.Base64
            });

            const data = new FormData()
            data.append("file", `data:image/jpeg;base64,${base64Img}`);
            data.append('upload_preset', 'jahxtdyd');
            data.append("cloud_name", "dkuujpm7w");
            fetch("https://api.cloudinary.com/v1_1/dkuujpm7w/image/upload", {
                method: "post",
                body: data
            }).then(res => res.json())
                .then(data => {
                    setImageUrl([data.secure_url])
                }).catch(err => {

                console.log("Printing Error")
                console.log(err)
            })
        }
    }

    const uploadData = async () => {
        await setDoc(doc(db, "BusinessList", Date.now().toString()), {
            name: businessName,
            address: businessAddress,
            contact: businessContact,
            about: about,
            website: businessWebsite,
            imageUrl: imageUrl[0],
            category : businessCategory,
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
        });
        ToastAndroid.show("New Business Added", ToastAndroid.BOTTOM)
        router.back();
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <TouchableOpacity onPress={pickImage}>
                    <Image style={styles.image} source={require('../../assets/images/camera.png')}/>
                    <Text style={styles.descripton}>Upload Photos</Text>
                </TouchableOpacity>
                <View style={styles.selectedImagesContainer}>
                    <FlatList data={images}
                              horizontal={true}
                              showsHorizontalScrollIndicator={false}
                              renderItem={({item, index}) => (
                                  <Image style={styles.selectedImages} source={{uri: item}} key={index}/>

                              )}/>

                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Business Name</Text>

                    <TextInput
                        numberOfLines={1}
                        placeholder={"Name"}
                        style={styles.inputs}
                        onChangeText={(value) => setBusinessName(value)}
                    />
                </View><View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Business Address</Text>

                <TextInput
                    numberOfLines={1}
                    placeholder={"Address"}
                    style={styles.inputs}
                    onChangeText={(value) => setBusinessAddress(value)}
                />
            </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Business Contact</Text>

                    <TextInput
                        numberOfLines={1}
                        placeholder={"Contact"}
                        style={styles.inputs}
                        onChangeText={(value) => setBusinessContact(value)}
                    />
                </View><View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Business Website</Text>

                <TextInput
                    numberOfLines={1}
                    placeholder={"Website"}
                    style={styles.inputs}
                    onChangeText={(value) => setBusinessWebsite(value)}
                />
            </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Business Category</Text>

                    <TextInput
                        numberOfLines={1}
                        placeholder={"Category"}
                        style={styles.inputs}
                        onChangeText={(value) => setBusinessCategory(value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>About</Text>

                    <TextInput
                        numberOfLines={5}
                        placeholder={"About"}
                        style={{textAlignVertical: 'top', ...styles.inputs}}
                        onChangeText={(value) => setAbout(value)}

                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

const styles = {
    image: {
        width: 40,
        height: 40
    },
    inputContainer: {
        gap: 10,
    },
    selectedImagesContainer: {},
    selectedImages: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginRight: 17,
    },
    button: {
        backgroundColor: Colors.Primary,
        padding: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "white",
    },
    inputTitle: {
        fontFamily: 'outfit',
        fontWeight: 'bold',
        fontSize: 15,
    },

    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 30,
    },
    inputs: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.Primary,
        paddingHorizontal: 8,
        paddingVertical: 8,

    }
}

export default AddBusiness;
