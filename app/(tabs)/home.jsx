import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Header} from '../../components/home';
import Slider from "../../components/home/slider";
import {db} from "../../config/firebaseConfig";
import {query, collection, getDocs} from "firebase/firestore";
import Category from "../../components/home/category";
import PopularBusiness from "../../components/home/popularBusiness";


function Home () {


    return (
        <ScrollView  >
            <Header/>
            <Slider/>
            <Category/>
            <PopularBusiness/>
        </ScrollView>
    );
}

export default Home ;

const styles = StyleSheet.create({
})