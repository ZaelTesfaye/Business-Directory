import React from 'react';
import {Image, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {Rating} from "react-native-ratings";
import {Colors} from "../../constants/Colors";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";
import {useUser} from "@clerk/clerk-expo";
import { arrayUnion } from "firebase/firestore";

function Reviews({details}) {

    const [rating, setRating] = React.useState(0);
    const [reviewInput, setReviewInput] = React.useState('');

    const {user} = useUser();


    const onSubmit = async () => {
        const docRef = doc(db, "BusinessList", details?.id)
        const updatedData = await updateDoc(docRef, {
            reviews: arrayUnion(
                {
                    rating,
                    comment: reviewInput,
                    userInfo: {

                        name: user?.fullName,
                        profile: user?.imageUrl,
                        email: user?.primaryEmailAddress?.emailAddress,

                    }
                })
        });

        ToastAndroid.show("Review added successfully", ToastAndroid.BOTTOM)
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Reviews</Text>

            <View>
                <Rating
                    imageSize={30}
                    showRating={false}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{paddingVertical: 10}}
                />


                <TextInput
                    placeholder='Write a review...'
                    numberOfLines={5}
                    onChangeText={(value) => setReviewInput(value)}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button}
                                  onPress={onSubmit}
                                  disabled={!reviewInput}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>



                <View style={styles.reviewsContainer}>
                    {details?.reviews?.map((review, index)=> (
                        <View style={ styles.review}>
                            <View style={styles.reviewHead}>
                                <View style={styles.profile}>
                                    <Image source={{uri:review?.userInfo.profile}} style={styles.profileImage}/>
                                    <Text>{review?.userInfo.name}</Text>
                                </View>

                                <Rating
                                    showRating={false}
                                    ratingCount={review?.rating}
                                    style={{ paddingVertical: 10 }}
                                    imageSize={18}
                                    readonly
                                    startingValue={review?.rating}
                                />
                            </View>
                            <Text style={styles.reviewText}>{review?.comment}</Text>

                        </View>
                        )
                    )}
                </View>


            </View>
        </ScrollView>

    );
}

const styles = {
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    reviewsContainer: {
      paddingVertical: 20,
        paddingLeft: 15,

    },
    reviewText: {
      color: "gray",
        fontWeight: "600",
    },
    profile: {
      flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    reviewHead: {
      flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
        paddingRight: 15,


    },
    review: {
      paddingBottom: 20,
    },

    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 100,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        numberOfLines: 5,
        textAlignVertical: 'top',
        borderRadius: 10,
        fontFamily: "outfit",
        padding: 10,
        fontSize: 15,
    },
    title: {
        fontSize: 16,
        fontFamily: 'outfit',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: Colors.Primary,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',


    },
    buttonText: {
        color: "white",
        fontSize: 14,
    }

}

export default Reviews;
