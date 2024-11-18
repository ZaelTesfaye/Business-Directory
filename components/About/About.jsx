import React from 'react';
import {Text, View} from 'react-native';

function About ({details}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About</Text>
            <Text style={styles.text}>{details.about}</Text>
        </View>

    );
}

const styles = {
    container: {
      paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'outfit',
        paddingBottom: 16,
    },
    text: {
        fontFamily: 'outfit',
        fontSize: 16,
        color: 'gray'
    }
}

export default About ;
