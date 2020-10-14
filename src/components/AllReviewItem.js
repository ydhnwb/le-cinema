import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar, Rating } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import * as utils from './../utils/Utils';


export const AllReviewItem = ({ review, onPress }) => {
    const tap = (e) => {
        onPress(review)
    } 

    return (
        <TouchableOpacity onPress={(e) => tap(e)}>
        <View style={{ flexDirection: "column" }}>
            <View style={styles.reviewContainer}>
                <Avatar rounded source={{ uri: utils.imagePatcher(review.user.image) }} />
                <View style={styles.reviewBody}>
                    <Text style={styles.textName}>{review.user.name}</Text>
                    <Text>on {review.Movie.title}</Text>
                    <Text>{review.content}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Rating readonly imageSize={8} fractions={1} startingValue={review.rating / 2} />
                        <Text style={{ marginStart: 4}} numberOfLines={1}>{review.rating / 2}/5</Text>
                    </View>
                </View>
            </View>
            <Divider />
        </View>

        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    reviewContainer: {
        padding: 16,
        flexDirection: "row"
    },
    reviewBody: {
        flex: 1,
        marginLeft: 10,
        flexDirection: "column"
    },
    textName: {
        fontSize: 16,
        fontWeight: "bold"
    },
    actions: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-around"
    }
})