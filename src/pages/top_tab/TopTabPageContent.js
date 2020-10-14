import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MovieItem } from '../../components/MovieItem';
import * as MovieService from '../../webservice/MovieService';

export default function TopTabPageContent({ genreId }) {
    const [moviesByGenre, setMoviesByGenre] = useState([])
    const isMounted = useRef(null);


    const fetchMovieByCategories = async () => {
        const resp = await MovieService.moviesByGenreId(genreId)
        if (isMounted.current &&  resp.status_code === 200) {
            setMoviesByGenre(resp.response.results)
        }
    }

    useEffect(() => {
        isMounted.current = true;
        fetchMovieByCategories()
        return () => {
          isMounted.current = false;
        }

    }, [])

    return (
        <View style={styles.rootContainer}>
            <FlatList
                numColumns="2"
                keyExtractor={(item) => item.id.toString()}
                data={moviesByGenre}
                renderItem={({ item }) => {
                    return <MovieItem movie={item} />
                }}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    rootContainer: { 
        flex: 1,
        alignSelf: "center",
        alignItems:"center",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "center" 
    }
})