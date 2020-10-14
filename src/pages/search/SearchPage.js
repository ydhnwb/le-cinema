import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import * as MovieService from './../../webservice/MovieService';
import { MovieItem } from '../../components/MovieItem';

export function SearchPage({ route, navigation }) {
    const [query, setQuery] = useState(route.params)
    const [movies, setMovies] = useState([])

    const doSearch = async () => {
        if (query.trim().length !== 0) {
            const res = await MovieService.searchMovieByTitle(query)
            if (res.status_code === 200) {
                setMovies(res.response)
            }
        }
    }

    const goToDetailPage = (movie) => {
        navigation.navigate("Movie detail", movie)
    }

    const renderMovies = useCallback(({ item }) => <MovieItem movie={item} onTap={goToDetailPage} />, [])

    useEffect(() => {
        doSearch(query)
    }, [])

    return (
        <View>
            <SearchBar
                returnKeyType="search"
                onSubmitEditing={doSearch}
                lightTheme={true}
                placeholder="Search..."
                onChangeText={setQuery}
                value={query}
            />
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={movies}
                renderItem={renderMovies}
            />
        </View>
    )
}