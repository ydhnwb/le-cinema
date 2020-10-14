import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export function CategoryPage () {
    const [categories, setCategories] = useState([])

    return (
        <View>
            <FlatList
                data={categories}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity>
                            <Text/>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}