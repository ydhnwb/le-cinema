import React from 'react';
import { View, Text, Image, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import * as utils from './../utils/Utils';

const iconSize = 18

const BottomTabBar = ({ state, navigation, ...props }) => {
  const auth = useSelector(state => state.authReducer)
  const { routes = [], index: activeIndex } = state;

  const profileLoggedInTab = () => {
    return (
      <Ionicons name="people-circle" size={iconSize} color="gray" />
      // <Image source={{ uri: utils.imagePatcher(auth.user.image) }} style={styles.userImage} />
    )
  }

  const regularTab = (index) => {
    let iconName;
    switch(index){
      case 0 : 
        iconName = "ios-film-outline";
        break;
      case 1 :
        iconName = "ios-chatbubbles-outline"
        break
      default:
        iconName = "people-circle";
    }
    return (
      <Ionicons name={iconName} size={iconSize} color="gray" />
    )
  } 

  return (
    <View style={styles.container}>

      <View style={styles.tabContainer}>
        {routes.map((it, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => { navigation.jumpTo(it.name);}}
              style={[
                styles.tabButton,
                {
                  borderTopWidth: activeIndex === index ? 1.5 : 0,
                },
              ]}>

              {

                index === routes.length - 1 ?
                  auth.user !== null ? profileLoggedInTab() : regularTab(index) : regularTab(index)
              }
              <Text>{it.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#00BCD4',
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imageIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
  userImage: {
    borderRadius: 60,
    height: 18,
    marginTop: 4,
    width: 18,
  },
});