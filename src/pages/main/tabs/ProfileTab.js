import React, { useEffect } from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import { ProfileMenuItem } from './../../../components/ProfileMenuItem';
import { Button } from 'react-native-elements';
import * as SharedPref from './../../../utils/SharedPref';
import * as actions from './../../../redux/action_types';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthService from './../../../webservice/AuthService';
import * as utils from './../../../utils/Utils'


export function ProfileTab({ navigation }) {
    const profileMenus = [
        {
            id: 1,
            title: "Your reviews",
            subtitle: "See all reviews you have posted",
            icon: "movie-open"
        },
        {
            id: 2,
            title: "Edit profile",
            subtitle: "Change your name, profile picture and more",
            icon: "account"
        },
        {
            id: 3,
            title: "Settings",
            subtitle: "Customize app settings",
            icon: "cog"
        },
        {
            id: 4,
            title: "Sign out",
            subtitle: "Logout from this app",
            icon: "account-cancel"
        }
    ]
    const auth = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    const fetchProfile = async () => {
        const token = auth.token
        if(token !== null){
            const response = await AuthService.profile(token)
            if(response.status_code === 200){
                const user = response.response.users
                await SharedPref.saveUserData(user)
                dispatch({ type: "FETCH_TOKEN", payload: { token, user } })
                return response.response.users
            }
        }
    }

    const onMenuPress = (index) => {
        switch (index) {
            case 0:
                navigation.navigate("My review")
                break;
            case 1:
                navigation.navigate("Update profile")
                break;
            case 2:
                navigation.navigate("Settings")
                break;
            case 3:
                askSignOut()
                break;
            default: console.log("Yes")
        }
    }

    const goToLoginPage = () => navigation.navigate("Login")
    const goToRegisterPage = () => navigation.navigate("Register")

    const doLogout = async () => {
        await SharedPref.removeToken()
        await SharedPref.removeUser()
        dispatch({ type: "SIGN_OUT", payload: { token: null, user: null } })
    }


    const askSignOut = () =>
        Alert.alert("Sign out", "Are you sure want to sign out from this app?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sign out", onPress: () => doLogout() }
            ],
            { cancelable: false }
        );

        useEffect(() => {
                fetchProfile()
        }, [])

    return (
        auth.token !== null ?
            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.userRow}>
                        <Image
                            style={styles.userImage}
                            source={{ uri: utils.imagePatcher(auth.user.image) }}
                        />
                        <View style={styles.userNameRow}>
                            <Text style={styles.userNameText}>{auth.user?.name}</Text>
                        </View>
                        <View style={styles.userBioRow}>
                            <Text style={styles.userBioText}>{auth.user?.email}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    {
                        profileMenus.map((menu, i) => {
                            return (
                                <ProfileMenuItem key={i} onPress={() => onMenuPress(i)} i={i} item={menu} />
                            )
                        })
                    }
                </View>
            </ScrollView>

            :

            <View style={styles.containerNotLoggedIn}>
                <Image style={{
                    alignSelf: "center",
                    width: 120,
                    height: 120
                }} source={require('./../../../assets/ic_doodle_personalize.png')} />
                <Text style={{ textAlign: "center", fontSize: 16 }}>Sign in and then share your thought about movies</Text>
                <View style={{ marginTop: 16, flexDirection: "row", justifyContent: "center" }}>
                    <Button onPress={goToRegisterPage} title="Create account" type="outline" />
                    <View style={{ marginStart: 16 }}>
                        <Button onPress={goToLoginPage} title="Sign in" />
                    </View>

                </View>
            </View>


    );
}

const styles = StyleSheet.create({
    containerNotLoggedIn: {
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: 16
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 10,
        padding: 16,
        paddingTop: 96
    },
    userBioRow: {
        marginLeft: 40,
        marginRight: 40,
    },
    userBioText: {
        color: 'gray',
        fontSize: 13.5,
        textAlign: 'center',
    },
    userImage: {
        borderRadius: 60,
        height: 72,
        marginBottom: 10,
        width: 72,
    },
    userNameRow: {
        marginBottom: 10,
    },
    userNameText: {
        color: '#5B5A5A',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 12,
    },
})