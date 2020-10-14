import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { MovieItem } from '../../../components/MovieItem';
import * as MovieService from './../../../webservice/MovieService';
import * as SharedPref from './../../../utils/SharedPref';
import * as actions from './../../../redux/action_types';

export function HomeTabAlt({ navigation }) {
    const [selectedTab, setSelectedTab] = useState("")
    const [filteredMovies, setFilteredMovies] = useState([])
    const [categories, setCategories] = useState([])
    const movieReducer = useSelector(state => state.movieReducer)
    const dispatch = useDispatch()

    const goToDetailPage = (movie) => {
        navigation.navigate("Movie detail", movie)
    }

    const onSelectTabChange = (item) => {
        console.log(item)
        if (movieReducer.movies !== null && movieReducer.movies.length !== 0) {
            setFilteredMovies(movieReducer.movies.filter((m) => m.category === item))
            setSelectedTab(item)
        } else {
            setSelectedTab(item)
        }

    }


    const fetchAllMovies = async () => {
        const token = await SharedPref.getToken()
        const res = await MovieService.allMovies(token)
        if (res.status_code === 200) {
            const movies = res.response
            dispatch({
                type: actions.FETCH_ALL_MOVIES,
                payload: { movies }
            })
            if (movies.length !== 0) {
                setFilteredMovies(movies.filter((m) => m.category === movies[0].category))
                onSelectTabChange(movies[0].category)
            }
        }
    }

    const filteredCategories = (movies) => {
        const filt = movies.filter((movie) => {

        })
    }

    const makeUnique = (arr) => {
        if (arr !== null) {
            var tmp = [];
            for (var i = 0; i < arr.length; i++) {
                if (tmp.indexOf(arr[i].category) === -1) {
                    tmp.push(arr[i].category);
                }
            }
            return tmp;
        }
        return []

    }



    const renderPoplarMovie = useCallback(({ item }) => <MovieItem movie={item} onTap={goToDetailPage} />, [])

    useEffect(() => {
        fetchAllMovies()
    }, [])

    return (
        // <ScrollView style={styles.rootContainer}>


        movieReducer.movies !== null ?
            <View style={styles.rootContainer}>
                <TouchableOpacity style={styles.allGenre}>
                    <Text>See all genres</Text>
                </TouchableOpacity>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    data={makeUnique(movieReducer.movies)}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => onSelectTabChange(item)}
                                style={item === selectedTab ? styles.genreItemSelected : styles.genreItemNotSelected}>
                                <Text style={item === selectedTab ? styles.textGenre : styles.textGenreNotSelected}>{item}</Text>
                            </TouchableOpacity>


                        )
                    }}
                />
                {/* <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.homeMovieTitle}>{selectedTab} movies</Text>
                    <TouchableOpacity style={{ marginEnd: 16 }}>
                        <Text>More</Text>
                    </TouchableOpacity>
                </View> */}

                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={filteredMovies}
                    renderItem={renderPoplarMovie}
                />
            </View>


            : <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                <ActivityIndicator size="large" color="blue" />
            </View>




        /* {
            selectedTab === "Home" ?
                <>
                    <View style={styles.homeMovieContainer}>
                        <Text style={styles.homeMovieTitle}>Popular movies</Text>
                        <Text style={styles.homeMovieTitle}>See all</Text>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        keyExtractor={(item) => item.id.toString()}
                        data={movieReducer.popularMovies}
                        renderItem={renderPoplarMovie}
                    />

                    <View style={styles.homeMovieContainer}>
                        <Text style={styles.homeMovieTitle}>Popular movies</Text>
                        <Text style={styles.homeMovieTitle}>See all</Text>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        keyExtractor={(item) => item.id.toString()}
                        data={movieReducer.movies}
                        renderItem={renderPoplarMovie}
                    />

                </> : selectedTab === "" ? null :

                <>
                    <TouchableOpacity style={styles.bannerCategory}>
                        <Text style={{ color: "white" }}>See all from {selectedTab}</Text>
                    </TouchableOpacity>
                    <Text style={styles.homeMovieTitle}>Box office from {selectedTab}</Text>
                    <FlatList
                        horizontal={true}
                        keyExtractor={(item) => item.id.toString()}
                        data={movieReducer.movies}
                        renderItem={renderPoplarMovie}
                    />
                </>
        } */


        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    bannerCategory: {
        marginHorizontal: 8,
        backgroundColor: "blue",
        borderRadius: 10,
        padding: 16
    },
    rootContainer: {
        marginTop: 64,
    },
    allGenre: {
        alignSelf: "flex-end",
        paddingHorizontal: 16,
        paddingTop: 16
    },
    genreItemNotSelected: {
        padding: 8,
        borderRadius: 16,
        marginHorizontal: 4,
        marginVertical: 16,
        borderWidth: 1,

    },
    homeMovieContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        flex: 1,
    },
    homeMovieTitle: {
        marginStart: 16,
        marginEnd: 16,
        fontWeight: "700",
        fontSize: 18

    },
    genreItemSelected: {
        padding: 8,
        borderRadius: 16,
        marginHorizontal: 4,
        marginVertical: 16,
        backgroundColor: '#00BCD4',
    },
    textGenre: {
        color: "white"
    },
    textGenreNotSelected: {
        color: "#000"
    }
})