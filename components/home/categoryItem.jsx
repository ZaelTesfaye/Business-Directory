import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Airline from '../../assets/images/airplane.png';
import cleaning from '../../assets/images/broom.png';
import RealEstate from '../../assets/images/house.png';
import school from '../../assets/images/school.png';
import cloth from '../../assets/images/shirt.png';
import Car from '../../assets/images/car.png';
import {useRouter} from "expo-router";
import tech from '../../assets/images/tech.png';
function categoryItem ({category, showBusinessList, setCategorySelected}) {

    const router = useRouter();

    const images = {
        Tech: tech,
        Airline: Airline,
        Cleaning: cleaning,
        Realestate: RealEstate,
        School: school,
        Cloth: cloth,
        Car: Car,
    };

    const onCategoryPress = (categoryName)=> {
        showBusinessList?
        router.push(`businessList/${categoryName}`) :
            setCategorySelected(categoryName);
    }

    return (
        <TouchableOpacity style={styles.button} onPress={() => {onCategoryPress(category.item.name)}}>
            <Image source={images[category.item.name]} style={styles.image}/>
            <Text style={styles.categoryText}>{category.item.name}</Text>
        </TouchableOpacity>

    );
}

const styles = {
    image: {
        width: 50,
        height: 50,


    },
    categoryText: {
        fontSize: 14,
    },
    button : {
        alignItems: 'center',
        marginHorizontal: 16,

    }
}

export default categoryItem ;
