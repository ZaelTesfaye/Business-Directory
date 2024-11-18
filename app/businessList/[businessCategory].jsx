import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";
import {useLocalSearchParams, useNavigation} from "expo-router";
import BusinessListCard from "../../components/home/businessListCard";

function BusinessCategory({route}) {

    const [businessList, setBusinessList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();

    const {businessCategory} = useLocalSearchParams();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: businessCategory
        })
        getBusinessList();
    }, [])

    const getBusinessList = async () => {
        setBusinessList([]);
        setIsLoading(true);
        const q = query(collection(db, "BusinessList"), where("category", "==", businessCategory));
        const querySnapshot = await getDocs(q);

        querySnapshot.docs.forEach(doc => {
            setBusinessList((prev) => [...prev, {id: doc.id, ...doc.data()}]);

        })
        setIsLoading(false);
    }

    return (
        <View>

            {isLoading ? <ActivityIndicator style={{paddingTop: 25}} color={"gray"}  size={"large"} /> :
            <FlatList data={businessList}
                      renderItem={({item, index}) => (
                          <BusinessListCard key={index} business={item}/>

                      )}
                      refreshing={false}
                      onRefresh={getBusinessList}
                      ListEmptyComponent={
                <View style={styles.notFoundContainer}>
                            <Text style={styles.notFound}>No Business Found</Text>
                </View>
            }
            />}

        </View>
    );
}

const styles = {
    notFound: {
        color: "gray",
        fontSize: 16,
        fontWeight: "medium",
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
}

export default BusinessCategory;
