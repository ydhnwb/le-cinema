import AsyncStorage from "@react-native-community/async-storage"

export const setToken = async (token) => {
    try{
        await AsyncStorage.setItem("token", token)
        return true
    }catch(err){
        return false
    }

}

export const getToken = async () => {
    const currentToken = await AsyncStorage.getItem('token')
        .then(v => v)
        .catch(err => null)
    return currentToken
}

export const getUser = async () => {
    const currentUserData = await AsyncStorage.getItem('user_data')
        .then(v => JSON.parse(v))
        .catch(err => null)
    return currentUserData
}


export const removeToken = async () => {
    await AsyncStorage.removeItem('token');
    return true
}

export const saveUserData = async (user) => {
    await AsyncStorage.setItem('user_data', JSON.stringify(user))
    return true
}

export const removeUser = async () => {
    await AsyncStorage.removeItem('user_data');
    return true
}