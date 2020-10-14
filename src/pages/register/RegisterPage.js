import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import * as AuthService from './../../webservice/AuthService';
import * as SharedPref from './../../utils/SharedPref';

export const RegisterPage = ({ navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [securePassword, setSecurePassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const fetchProfile = async (token) => {
        const response = await AuthService.profile(token)
        if(response.status_code === 200){
            await SharedPref.saveUserData(response.response.users)
            return response.response.users
        }
        return false
    }

    const doRegister = async () => {
        if(validate()){
            setIsLoading(true)
            const response = await AuthService.register(name.trim(), email.trim(), password.trim())
            console.log(response)
            if (response.status_code === 201) {
                console.log(response)
                const token = response.response.token
                const user = await fetchProfile(token)
                if(user !== false){
                    await SharedPref.setToken(token)
                    dispatch({ type: "FETCH_TOKEN", payload: { token, user } })
                    navigation.popToTop()
                }

            } else {
                showInfoAlert("Failed", "Failed registering your account.")
            }
            setIsLoading(false)

        }

    }

    const showInfoAlert = (title, message) => {
        Alert.alert(title, message, [
            { text: "Understand", onPress: () => console.log("OK Pressed") }
        ],
            { cancelable: true }
        );
    }

    const validate = () => {
        const regexPassword = /^(?=[a-zA-Z0-9]*[a-zA-Z])(?=[a-zA-Z0-9]*\d)[a-zA-Z0-9]*$/i
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (name.trim().length === 0) {
            showInfoAlert("Info", "Please fill name field first")
            return false
        }
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={{
                margin: 8
            }}>
                <Ionicons name="chevron-back" size={32} />
            </TouchableOpacity>
            <Text style={styles.titlePage}>Create account</Text>
            <Text style={{ marginStart: 16, marginEnd: 16, marginBottom: 16 }}>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet</Text>
            <View style={styles.form}>
                <Input
                    onChangeText={text => setName(text)}
                    placeholder='Full name'
                    leftIcon={
                        <MaterialCommunityIcons
                            name='account'
                            size={24}
                            color='gray'
                        />
                    }
                />
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
                    secureTextEntry={securePassword}
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
                            onPress={() => setSecurePassword(!securePassword)}
                            name='eye-off'
                            size={24}
                            color='gray'
                        />
                    }
                />
                <TouchableOpacity
                    disabled={isLoading}
                    style={styles.SubmitButtonStyle}
                    activeOpacity={.5}
                    onPress={() => doRegister()}>
                    {
                        isLoading ?
                            <ActivityIndicator color="#ffffff" size="small" />
                            :
                            <Text style={styles.TextStyle}> Register </Text>
                    }

                </TouchableOpacity>

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
    }

})