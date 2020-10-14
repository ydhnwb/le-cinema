import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AllReviewItem } from '../../../components/AllReviewItem';
import * as MovieService from './../../../webservice/MovieService';

export function ReviewTab() {
    const [isLoading, setIsLoading] = useState(false)
    const [reviews, setReviews] = useState([])


    const fetchAllReviews = async () => {
        setIsLoading(true)
        const res = await MovieService.getAllReviews()
        setIsLoading(false)

        if (res.status_code === 200) {
            setReviews(res.response)
        }
    }

    const onReviewClick = () => {
        console.log()
    }

    useEffect(() => {
        fetchAllReviews()
    }, [])


    return (
        <View style={styles.root}>
            {
                !isLoading ? <FlatList
                    style={styles.reviewTabContainer}
                    keyExtractor={item => item.id.toString()}
                    data={reviews}
                    renderItem={({ item }) => {
                        return (<AllReviewItem onPress={onReviewClick} review={item} />)
                    }}
                /> : <ActivityIndicator size="large" color="blue"/>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex:1, 
        justifyContent: "center",
    },
    reviewTabContainer: {
        marginTop: 64
    }
})