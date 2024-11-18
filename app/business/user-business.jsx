import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useUser} from "@clerk/clerk-expo";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";
import {ScrollView} from "react-native";
import UserBusinessCard from "../../components/userBusinessCard";
import {useNavigation} from "expo-router";
import {Colors} from "../../constants/Colors";

function UserBusiness () {

    const [businessList, setBusinessList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const {user} = useUser();

        const navigate = useNavigation();


    useEffect(() => {

        navigate.setOptions({
            headerShown: true,
            headerTitle: "My Lists",
            headerStyle: {
                backgroundColor: Colors.Primary,
                textColor: "white"
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white', // Color of the header title text
            },
        });

        getUserPosts();
    }, [])

    const getUserPosts = async ()=> {
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db, "BusinessList"),
            where("userEmail", "==", user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);

        querySnapshot.docs.forEach(doc => {
            setBusinessList((prev) => [...prev, {id: doc.id, ...doc.data()}]);
        })
        setLoading(false);
    }

    return (
        <View style={styles.container}>

            <FlatList data={businessList}
                      showsVerticalScrollIndicator={false}
                      onRefresh={getUserPosts}
                      refreshing={businessList.length === 0}
                      renderItem={({item, index})=> (
                          <UserBusinessCard business={item} key={index} />
                      )}  />

        </View>
    );
}

const styles = {
    container: {
        marginHorizontal: 30,
        marginTop: 50,

    }
}

export default UserBusiness ;
