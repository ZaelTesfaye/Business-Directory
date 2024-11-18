import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";
import CategoryItem from "./categoryItem";
import {useRouter} from "expo-router";

function Category({ShowText=true, setCategorySelected}) {
    const [isLoading, setIsLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter();
    useEffect(() => {
        getCategoryList();
    }, [])

    const getCategoryList = async () => {
        setIsLoading(true);
        setCategoryList([]);
        const q = query(collection(db, "Category"))
        const querySnapshot = await getDocs(q);

        querySnapshot.docs.forEach(doc => {
            setCategoryList((prev) => [...prev, doc.data()]);
        })
        setIsLoading(false);
    }


    return (
        <View style={styles.container}>
            {ShowText&& <Text style={styles.text}>Category</Text>}

            {isLoading ? <ActivityIndicator color={"gray"}  size={"large"}  /> :<FlatList
                style={styles.list}
                data={categoryList}
                      renderItem={(item, index) => (
                          <CategoryItem showBusinessList={ShowText}
                                        category={item}
                                        key={item.id}
                                        setCategorySelected={setCategorySelected} />
                      )}
                      horizontal={true}
                      showsHorizontalScrollIndicator = {false}
            />}
        </View>

    );
}

const styles = {
    container: {
        paddingTop: 20,
    },
    list: {
      marginHorizontal: 5,
    },
    text: {
        fontFamily: "outfit",
        fontSize: 17,
        fontWeight: "bold",
        padding: 10

    },

}


export default Category;
