import * as utils from './../utils/Utils';
import axios from 'axios';

export const login = async (email, password) => {
    try {
        const url = utils.MOVIE_LOGIN
        let status_code;
        const payload = { email: email, password: password }
        const response = await axios.post(url, payload, { headers: utils.DefaultHeader })
            .then((res) => {
                status_code = res.status
                return res.data
            }).catch(err => {
                status_code = err.response.status
                console.log("Erorr: " + err)
                return err
            })
        return { response, status_code }
    } catch (err) {
        console.log(`Exception in login : ${err}`)
        return { response: null, status_code: null }
    }
}

export const register = async (name, email, password) => {
    try {
        let status_code;
        const url = utils.MOVIE_REGISTER
        const payload = {
            name, email, password
        }
        console.log(payload)
        const response = await axios.post(url, payload, { headers: utils.DefaultHeader })
            .then((res) => {
                status_code = res.status;
                return res.data;
            })
            .catch(err => {
                status_code = err.response.status;
                console.log("Erorr: " + err)
                return err
            })
        return { response, status_code }
    } catch (err) {
        console.log(`Exception in register : ${err}`)
        return { response: null, status_code: null }
    }
}



export const profile = async (token) => {
    try {
        let url = utils.USER_PROFILE
        console.log(token)
        console.log(url)
        let status_code;
        const response = await axios.get(url, { headers: utils.TokenHeader(token) })
            .then((res) => {
                console.log(res.data)
                status_code = res.status;
                return res.data;
            })
            .catch(err => {
                status_code = err.response.status;
                console.log("Erorr: " + err)
                return err
            })
        return { response, status_code }
    } catch (err) {
        console.log(`Exception in fetch profile : ${err}`)
        return { response: null, status_code: null }
    }
}

export const updateProfilePicture = async (token, image) => {
    try {
        let url = utils.UPDATE_USER_IMAGE
        let status_code;
        let data = new FormData();
        if (Object.keys(image).length !== 0) {
            data.append("image", {
                name: image.fileName,
                type: image.type,
                uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
            });
        }

        const response = await fetch(url, {
            method: "PUT",
            body: data,
            headers: {
                token: token,
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                status_code = response.status;
                return response;
            })
            .catch(error => {
                status_code = null
                console.log(error)
                return error
            });
        return { response, status_code }
    } catch (err) {
        console.log(`Exception in update profile pic : ${err}`)
        return { response: null, status_code: null }
    }
}


export const updateProfile = async (token, body) => {
    try {
        let url = utils.UPDATE_USER
        let status_code;
        const response = await axios.put(url, body, { headers: utils.TokenHeader(token) })
            .then((res) => {
                status_code = res.status;
                return res.data;
            })
            .catch(err => {
                console.log("Erorr: " + err)
                status_code = null;
                return err
            })
        return { response, status_code }
    } catch (err) {
        console.log(`Exception in update profile : ${err}`)
        return { response: null, status_code: null }
    }
}