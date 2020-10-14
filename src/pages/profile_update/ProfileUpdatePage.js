import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthService from './../../webservice/AuthService';
import * as utils from './../../utils/Utils';
import * as SharedPref from './../../utils/SharedPref';

const imageSize = 72;

export function ProfileUpdatePage({ navigation }) {
    const authReducer = useSelector(state => state.authReducer)
    const [image, setImage] = useState({})
    const [name, setName] = useState(authReducer.user.name)
    const [email, setEmail] = useState(authReducer.user.email)
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()



    const pickAnImage = () => {
        const options = {
            noData: true,
          }
        ImagePicker.launchImageLibrary(options, response => {
            try{
                if(response.uri){
                    setImage(response)
                }
            }catch(e){
                console.log(e)
            }

        })
    }

    const fetchProfile = async () => {
        const token = authReducer.token
        if(token !== null){
            setIsLoading(true)
            const response = await AuthService.profile(token)
            if(response.status_code === 200){
                const user = response.response.users
                await SharedPref.saveUserData(user)
                dispatch({ type: "FETCH_TOKEN", payload: { token, user } })
                return response.response.users
            }
            setIsLoading(false)
        }
    }

    const validate = () => {
        if(name.trim().length === 0){
            showInfoAlert("Info", "Name cannot be empty")
            return false
        }
        if(password.trim().length !== 0){
            const regexPassword = /^(?=[a-zA-Z0-9]*[a-zA-Z])(?=[a-zA-Z0-9]*\d)[a-zA-Z0-9]*$/i
            const isValid = regexPassword.test(password)
            if(password.length > 6 && isValid){
                return true
            }
            showInfoAlert("Info", "Password must be at least six chars and contains letter and number")
            return false
        }
        return true
    }

    const doUpdate = async () => {
        if(validate()){
            setIsLoading(true)
            const token = authReducer.token
            const body = { name: name.trim() }
            if(password.trim().length !== 0){
                body['password'] = password.trim()
            }
            const res = await AuthService.updateProfile(token, body)
            if(res.status_code === 200){
                if(Object.keys(image).length !== 0){
                    const res_image = await AuthService.updateProfilePicture(token, image)
                    console.log(res_image)
                    if(res_image.status_code === 200){
                        await fetchProfile()
                        navigation.goBack()
                    }
                }else{
                    await fetchProfile()
                    navigation.goBack()
                }
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

    return (
        <ScrollView >
            <TouchableOpacity onPress={() => pickAnImage()}>
                <View style={styles.container}>
                    <Image
                        style={styles.userImage}
                        source={{ uri: Object.keys(image).length === 0  ? utils.imagePatcher(authReducer.user.image) : image.uri }}
                    />
                    <View style={styles.editView}>
                        <Ionicons name="pencil-sharp" size={14} color="white" />
                    </View>
                </View>
            </TouchableOpacity>



            <View style={styles.inputBody}>
                <Input
                    onChangeText={setName}
                    value={name}
                    placeholder='Name'
                    leftIcon={
                        <MaterialCommunityIcons
                            name='account'
                            size={24}
                            color='gray'
                        />
                    }
                />
                <Input
                    value={email}
                    disabled={true}
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
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholder='Password (optional)'
                    leftIcon={
                        <MaterialCommunityIcons
                            name='shield-lock'
                            size={24}
                            color='gray'
                        />
                    }
                />
                <TouchableOpacity
                    disabled={isLoading}
                    style={styles.SubmitButtonStyle}
                    activeOpacity={.5}
                    onPress={doUpdate}>
                    {
                        isLoading ?
                            <ActivityIndicator color="#ffffff" size="small" />
                            :
                            <Text style={styles.TextStyle}>Update</Text>
                    }

                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "center",
    },
    userImage: {
        marginTop: 16,
        borderRadius: 60,
        height: imageSize,
        marginBottom: 16,
        width: imageSize,
    },
    editView: {
        padding: 2,
        backgroundColor: "red",
        borderRadius: 38,
        position: "absolute",
        alignSelf: "flex-end",
        marginTop: imageSize
    },
    inputBody: {
        margin: 16,
        flex: 1,
        flexDirection: "column"
    },
    SubmitButtonStyle: {
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#00BCD4',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
})