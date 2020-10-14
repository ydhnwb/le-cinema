import React from 'react';
import { View, Dimensions, ImageBackground, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';
import * as utils from './../utils/Utils';


const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export const MovieCover = ({ movie }) => {
    return (
        <ImageBackground source={{ uri: utils.imagePatcher(movie.backdrop) }} style={{ flex: 1, height: screenHeight * 0.27 }}>
            <View style={styles.containerText}>
                <Text style={styles.titleText}>{movie.title}</Text>
                <View style={{flexDirection: "row", alignItems:"center"}}>
                    <Rating tintColor="rgba(0, 0, 0, 0.8))" readonly imageSize={8} fractions={1} startingValue={movie.rating/2}  />
                    <Text style={styles.subtitleText} numberOfLines={1}>{movie.rating/2}</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({

    containerText: { 
        backgroundColor:'rgba(0,0,0,0.3)',
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'flex-end', 
        alignItems: 'flex-start',
        padding: 16
    },
    titleText : {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },
    subtitleText : {
        marginStart: 4,
        fontSize: 12,
        color: 'white'
    }

})