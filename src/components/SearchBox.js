import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export const SearchBox = ({ navigation }) => {
    const [query, setQuery] = useState("")

    const doSearch = () => {
        if(query.trim().length !== 0){
            navigation.navigate("Search page", query)
            setQuery("")
        }

    }
    
    return (
        <View style={styles.searchBoxContainer}>
            <TextInput value={query} onChangeText={setQuery} returnKeyType="search" onSubmitEditing={doSearch} placeholder="Search movies..." placeholderTextColor="#666" style={styles.searchBox}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBoxContainer: {
        margin: 10,
        backgroundColor: "#fff",
        elevation: 10,
        borderRadius: 4,
        marginVertical: 16,
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "stretch",
    },
    searchBox: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 18,
        alignSelf: "stretch",
        alignContent: "stretch"
    }
})