import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './../pages/main/MainPage';
import LoginPage from '../pages/login/LoginPage';
import { SearchBox } from '../components/SearchBox';
import { RegisterPage } from '../pages/register/RegisterPage';
import { MyReviewPage } from '../pages/my_review/MyReviewPage';
import {  ProfileUpdatePage } from '../pages/profile_update/ProfileUpdatePage'; 
import { SettingPage } from '../pages/settings/SettingPage';
import { MovieDetailPage } from './../pages/movie_detail/MovieDetailPage';
import { SearchPage } from '../pages/search/SearchPage';

const RootStack = createStackNavigator();

export default function RootApp() {


    return (
        <RootStack.Navigator initialRouteName="Main">
            <RootStack.Screen name="Main" component={MainPage} options={{
                headerTransparent: true,
                header: props => <SearchBox {...props}/>
            }}/>
            <RootStack.Screen name="Login" component={LoginPage} options={{
                headerShown: false
            }}/>
            <RootStack.Screen name="Register" component={RegisterPage} options={{
                headerShown: false
            }}/>
            <RootStack.Screen name="Update profile" component={ProfileUpdatePage}/>
            <RootStack.Screen name="My review" component={MyReviewPage}/>
            <RootStack.Screen name="Settings" component={SettingPage}/>
            <RootStack.Screen name="Movie detail" component={MovieDetailPage} options={{
                headerShown: false
            }}/>
            <RootStack.Screen name="Search page" component={SearchPage} options={{
                headerShown: false
            }}/>
        </RootStack.Navigator>
    )
}