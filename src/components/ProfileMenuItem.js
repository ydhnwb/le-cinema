import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const ProfileMenuItem = ({ i, item, onPress }) => {
    const onClick = (e) => {
        e.preventDefault();
        onPress(item)
    }
    return (
        <ListItem key={i} bottomDivider onPress={(e) => onClick(e)}>
            {/* <Avatar source={{ uri: l.avatar_url }} /> */}
            <MaterialCommunityIcons name={item.icon} size={32} color={"#808080"}/>
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
    },
})