import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { Rating } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as utils from './../utils/Utils';


const { width, height } = Dimensions.get('window');


export const MovieItem = ({ movie, onTap }) => {

    const tap = () => {
        onTap(movie)
    }

    return (
        <View style={{width: width * 0.5,}}>
            <TouchableOpacity style={styles.container} onPress={tap}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: utils.imagePatcher(movie.poster) }} style={styles.image} />
                </View>
                <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
                <View style={{flexDirection: "row", alignItems:"center"}}>
                    <Rating readonly imageSize={8} fractions={1} startingValue={movie.rating/2}  />
                    <Text style={styles.genre} numberOfLines={1}>{movie.rating/2}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: height * 0.36,
        width: width * 0.44,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        borderRadius: 10,
        ...StyleSheet.absoluteFillObject,
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        marginTop: 4,
    },
    genre: {
        color: '#BBBBBB',
        fontSize: 12,
        lineHeight: 14,
    },
});