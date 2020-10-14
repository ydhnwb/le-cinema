import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import * as AuthService from './../../webservice/AuthService'
import * as SharedPref from './../../utils/SharedPref';
import * as actions from './../../redux/action_types';

const iconSize = 32

export default function LoginPage({ navigation }) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setShowPassword] = useState(true)

    const goToRegisterPage = () => navigation.navigate("Register")


    const doLogin = async () => {
        if(validate()){
            setIsLoading(true)
            const response = await AuthService.login(email.trim(), password.trim())
            if (response.status_code === 200) {
                const token = response.response.token
                const user = await fetchProfile(token)
                if(user){
                    await SharedPref.setToken(token)
                    dispatch({ type: actions.FETCH_TOKEN, payload: { 
                        token: token,
                        user: user
                    }})
                    navigation.goBack()
                }
            } else {
                showInfoAlert("Login failed", "Please check again your credentials.")
            }
            setIsLoading(false)
        }
    }

    const fetchProfile = async (token) => {
        const response = await AuthService.profile(token)
        if(response.status_code === 200){
            await SharedPref.saveUserData(response.response.users)
            return response.response.users
        }
        return false
    }


    const showInfoAlert = (title, message) => {
        Alert.alert(title, message, [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
            { cancelable: true }
        );
    }

    const validate = () => {
        const regexPassword = /^(?=[a-zA-Z0-9]*[a-zA-Z])(?=[a-zA-Z0-9]*\d)[a-zA-Z0-9]*$/i
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (email.trim().length === 0) {
            showInfoAlert("Info", "Please type your email address")
            return false
        }
        if (!regexEmail.test(email.trim())) {
            showInfoAlert("Info", "Email is not valid")
            return false
        }
        if(password.trim().length === 0 || password.trim().length < 6){
            showInfoAlert("Info", "Please input your password and minimum is six caharacters contains letter and number")
            return false
        }
        if(!regexPassword.test(password.trim())){
            showInfoAlert("Info", "Password must contains letter and number")
            return false
        }
        return true
    }

    return (
        <ScrollView>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.marginOnly8}>
                <Ionicons name="chevron-back" size={iconSize} />
            </TouchableOpacity>
            <Text style={styles.titlePage}>Sign in</Text>
            <Text style={styles.textHeaderDescription}>With sign in, you can access all the feature like reviewing movie and more.</Text>
            <View style={styles.form}>
                <Input
                    onChangeText={text => setEmail(text)}
                    placeholder='Email'
                    leftIcon={
                        <MaterialCommunityIcons
                            name='email'
                            size={24}
                            color='gray'
                        />
                    }
                />
                <Input
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={isShowPassword}
                    placeholder='Password'
                    leftIcon={
                        <MaterialCommunityIcons
                            name='shield-lock'
                            size={24}
                            color='gray'
                        />
                    }
                    rightIcon={
                        <MaterialCommunityIcons
                            onPress={() => setShowPassword(!isShowPassword)}
                            name={ isShowPassword? 'eye-off' : 'eye' }
                            size={24}
                            color='gray'
                        />
                    }
                />
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                <TouchableOpacity
                    disabled={isLoading}
                    style={styles.SubmitButtonStyle}
                    activeOpacity={.5}
                    onPress={() => doLogin()}>
                    {
                        isLoading ?
                            <ActivityIndicator color="#ffffff" size="small" />
                            :
                            <Text style={styles.TextStyle}>Login</Text>
                    }

                </TouchableOpacity>

                <Text style={styles.dontHaveAccountText}>
                    Don't have an account? <Text onPress={goToRegisterPage} style={{ fontWeight: 'bold' }}>Create now!</Text>
                </Text>
                <View style={styles.altLogin}>
                    <View style={styles.border} />
                    <Text style={{ alignSelf: 'center', paddingHorizontal: 5 }}>OR</Text>
                    <View style={styles.border} />
                </View>
                <View style={styles.loginOptions}>
                    <TouchableOpacity style={styles.altSignInButton}>
                        <MaterialCommunityIcons
                            name='google'
                            size={24}
                            color='grey'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.altSignInButton}>
                        <MaterialCommunityIcons
                            name='facebook'
                            size={24}
                            color='grey'
                        />
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    titlePage: {
        fontSize: 24,
        marginStart: 16
    },
    form: {
        marginStart: 10,
        marginEnd: 10,
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
    SubmitButtonStyle: {
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#00BCD4',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#fff'
    },
    forgotPasswordText: {
        alignSelf: "flex-end",
        marginBottom: 16

    },
    altSignInButton: {
        borderRadius: 400,
        elevation: 1,
        margin: 4,
        backgroundColor: "white",
        padding: 8
    },
    marginOnly8 : {
        margin: 8
    },
    textHeaderDescription: { 
        marginStart: 16,
        marginEnd: 16, 
        marginBottom: 16 
    },
    dontHaveAccountText : { 
        textAlign: 'center', 
        marginTop: 16 
    },
    altLogin: { 
        flexDirection: 'row', 
        marginHorizontal: 16, 
        marginVertical: 16
    },
    loginOptions: { 
        flexDirection: 'row',
        justifyContent: "center"
    },
    border: { 
        backgroundColor: 'black', 
        height: 1, 
        flex: 1, 
        alignSelf: 'center' 
    }
})