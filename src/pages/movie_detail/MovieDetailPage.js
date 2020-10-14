import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, View, StyleSheet, Dimensions, FlatList, Alert, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MovieCover } from '../../components/MovieCover';
import YouTube from 'react-native-youtube';
import { Modalize } from 'react-native-modalize';
import { Button, Input, Overlay, Rating } from 'react-native-elements';
import { ReviewItem } from '../../components/ReviewItem';
import { useSelector } from 'react-redux';
import * as utils from './../../utils/Utils';
import * as SharedPref from './../../utils/SharedPref';
import * as MovieService from './../../webservice/MovieService';

const { width, height } = Dimensions.get('window');


export function MovieDetailPage({ route }) {
    const authReducer = useSelector(state => state.authReducer)
    const modalizeRef = useRef(null);
    const [movieDetail, setMovieDetail] = useState({})
    const [visible, setVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState("")

    const checkIsLoggedIn = () => {
        console.log(authReducer.token)
        if (authReducer.token === null) {
            showAlert("Not logged in", "Please login to post your review")
            return false
        }
        return true
    }

    const toggleOverlay = () => {
        if (checkIsLoggedIn()) {
            setVisible(!visible)
            resetRatingAndContent()
        }
    };

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const showAlert = (title, message) =>
        Alert.alert(title, message,
            [
                { text: "Understand", onPress: () => console.log() }
            ],
            { cancelable: false }
        );

    const resetRatingAndContent = () => {
        setRating(0)
        setContent("")
    }

    const finishRating = (star) => {
        setRating(star)
    }

    const fetchMovieDetail = async () => {
        const res = await MovieService.getSingleMovie(route.params.id)
        if (res.status_code === 200) {
            setMovieDetail(res.response)
        } else {
            showInfoAlert("Failed", "Failed to get movie data")
        }
    }

    const createReview = async () => {
        if (validate()) {
            setIsLoading(true)
            const payload = { content, rating }
            const token = await SharedPref.getToken()
            if (token !== null) {
                const res = await MovieService.sendReview(token, route.params.id, payload)
                if (res.status_code === 200) {
                    toggleOverlay()
                    resetRatingAndContent()
                    fetchMovieDetail()
                } else {
                    showInfoAlert("Failed", "Failed to post your review. Make sure you are not reviewed this movie already")
                }
            }
            setIsLoading(false)
        }
    }

    const validate = () => {
        if (content.trim().length === 0) {
            showInfoAlert("Info", "Please write something about this movie")
            return false
        }
        return true
    }

    const showInfoAlert = (title, message) => Alert.alert(title, message,[
            { text: "Understand", onPress: () => console.log() }
        ],
        { cancelable: true }
    );

    useEffect(() => {
        fetchMovieDetail()
    }, [])

    return (
        <View>
            <ScrollView >
                <MovieCover movie={route.params} />
                <View style={styles.bodyContainer}>
                    <Image source={{ uri: route.params.poster }} style={{ width: width * 0.40, height: height * 0.28 }} />
                    <Text style={styles.bodyTitle}>{route.params.title}</Text>
                    <View style={styles.borderContainer}>
                        <Text style={styles.border}>{route.params.category}</Text>
                    </View>
                    <Text style={{ marginTop: 8, marginBottom: 16 }}>{route.params.synopsis}</Text>
                    <YouTube
                        apiKey="AIzaSyBpwmv_qpnr2wyCBUp7MF1qs33KgFO2i28"
                        videoId={utils.extractYuotubeKey(route.params.trailer)}
                        style={{ alignSelf: "stretch", height: height * 0.30 }}
                    />
                </View>

                <Button disabled={isLoading} onPress={onOpen} style={{ marginBottom: 16 }} title="See reviews" type="clear" />

            </ScrollView>
            <>

                <Modalize ref={modalizeRef} style={styles.modal} HeaderComponent={
                    <View>
                        <Button onPress={toggleOverlay} title="Write review" type="outline" />
                        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                            <View style={{ height: 'auto', width: width * 0.8, padding: 16 }}>
                                <Text style={{ textAlign: 'center' }}>How much you enjoy this movie? (Swipe the stars!)</Text>
                                <Rating ratingCount={10} onFinishRating={(r) => finishRating(r)} imageSize={28} startingValue={0} />
                                <Input onChangeText={(text) => setContent(text)} textAlignVertical="top" placeholder='Your review' multiline={true} numberOfLines={5} />
                                <Button onPress={createReview} title="Post review" />
                            </View>
                        </Overlay>
                    </View>

                }>
                    {
                        Object.keys(movieDetail).length !== 0 ? <FlatList
                            keyExtractor={item => item.id.toString()}
                            data={movieDetail.review}
                            renderItem={({ item }) => {
                                return (<ReviewItem movie={route.params} review={item} />)
                            }}
                        /> : <ActivityIndicator size="large" color="blue" />

                    }
                </Modalize>
            </>
        </View>

    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column"
    },
    bodyContainer: {
        flex: 1,
        // backgroundColor: 'red',
        flexDirection: "column",
        margin: 16
    },
    bodyTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    bodyCategory: {
        borderColor: 'black',
        borderRadius: 16,
        borderWidth: 0.5,
    },
    borderContainer: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    border: {
        fontSize: 12,
        paddingHorizontal: 4,
        borderRadius: 16,
        borderWidth: 0.5,
        borderBottomColor: '#428947',

    },
    subtitleText: {
        marginStart: 4,
        fontSize: 12,
    },

    image: {
        borderRadius: 10,
    },
    modal: {
        position: 'absolute',
        borderRadius: 16
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flex: 1,
        flexGrow: 1,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

})
