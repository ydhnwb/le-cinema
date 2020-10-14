import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MyReviewItem } from '../../components/MyReviewItem';
import { Button, Input, Overlay, Rating } from 'react-native-elements';
import * as MovieService from './../../webservice/MovieService';
import * as SharedPref from './../../utils/SharedPref';

const { width, height } = Dimensions.get('window');


export function MyReviewPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState("")
    const [selectedReview, setSelectedReview] = useState({})
    const [isWaiting, setIsWaiting] = useState(false)
    const [visible, setVisible] = useState(false)

    const fetchMyReviews = async () => {
        setIsLoading(true)
        const token = await SharedPref.getToken()
        const res = await MovieService.myReviews(token)
        if (res.status_code === 200) {
            setReviews(res.response)
        }
        setIsLoading(false)
    }

    const resetRatingAndContent = () => {
        setRating(0)
        setContent("")
    }

    const finishRating = (star) => {
        setRating(star)
    }

    const toggleOverlay = () => {
        setVisible(!visible)
        resetRatingAndContent()
    };

    const validate = () => {
        if (content.trim().length === 0) {
            showInfoAlert("Info", "Please write something about this movie")
            return false
        }
        return true
    }

    const onReviewClick = (review) => {
        setSelectedReview(review)
        setRating(review.rating)
        setContent(review.content)
        setVisible(true)
    }

    const doUpdateReview = async (review) => {
        if(validate()){
            setIsWaiting(true)
            const payload = {
                content: content,
                rating: rating
            }
            const token = await SharedPref.getToken()
            const res = await MovieService.updateReview(token, selectedReview.MovieId, payload)
            if(res !== null){
                resetRatingAndContent()
                fetchMyReviews()
            }else{
                showInfoAlert("Failed", "Failed when updating review")
            }
            setIsWaiting(false)
            toggleOverlay()
        }

    }

    const onReviewDelete = (review) => {
        askDelete("Delete", "Are you sure to delte this review?", review)
    }

    const doDelete = async (review) => {
        const token = await SharedPref.getToken()
        const res = await MovieService.deleteReview(token, review.id)
        if (res.status_code !== null) {
            fetchMyReviews()
        } else {
            showInfoAlert("Failed", "Failed to delete this review.")
        }
    }

    const showInfoAlert = (title, message) => Alert.alert(title, message,
        [
            { text: "Understand", onPress: () => console.log() }
        ],
        { cancelable: false }
    );

    const askDelete = (title, message, review) =>
        Alert.alert(title, message, [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "Delete", onPress: () => doDelete(review) }
        ],
            { cancelable: false }
        );

    useEffect(() => {
        fetchMyReviews()
    }, [])


    return (
        <View style={styles.root}>
            {
                !isLoading ? <FlatList
                    style={styles.reviewTabContainer}
                    keyExtractor={item => item.id.toString()}
                    data={reviews}
                    renderItem={({ item }) => {
                        return (<MyReviewItem onDelete={onReviewDelete} onPress={onReviewClick} review={item} />)
                    }}
                /> : <ActivityIndicator size="large" color='#00BCD4' />
            }

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View style={{ height: 'auto', width: width * 0.8, padding: 16 }}>
                    <Text style={{ textAlign: 'center' }}>How much you enjoy this movie? (Swipe the stars!)</Text>
                    <Rating fraction={1} ratingCount={10} onFinishRating={(r) => finishRating(r)} imageSize={28} startingValue={rating} />
                    <Input value={content} onChangeText={(text) => setContent(text)} textAlignVertical="top" placeholder='Your review' multiline={true} numberOfLines={5} />
                    <Button onPress={doUpdateReview} disabled={isWaiting} title="Update review" />
                </View>
            </Overlay>


        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
    },
    reviewTabContainer: {
    }
})