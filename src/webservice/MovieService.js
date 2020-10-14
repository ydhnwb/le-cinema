import * as utils from './../utils/Utils';
import axios from 'axios';


export const allMovies = async (token) => {
    try{
        let status_code;
        const header = utils.TokenHeader(token)
        const response = await axios.get(utils.MOVIE_ALL, { headers: header })
        .then((res) => {
            status_code = res.status
            return res.data
        }).catch(err => {
            status_code = err.response.status
            return err
        })
        return {response, status_code}
    }catch(err){
        console.log(`Exception in allMovies : ${err}`)
        return {response: null, status_code: null}
    }
}

export const sendReview = async (token, movieId, review) => {
    try{
        let status_code;
        const url = utils.CREATE_REVIEW(movieId)
        const header = utils.TokenHeader(token)
        const payload = {
            content: review.content,
            rating: review.rating
        }
        const response = await axios.post(url , payload, { headers: header })
        .then((res) => {
            status_code = res.status
            return res.data
        }).catch(err => {
            status_code = err.response.status
            return err
        })
        return {response, status_code}
    }catch(err){
        console.log(`Exception in sendReview : ${err}`)
        return {response: null, status_code: null}
    }
}

export const getSingleMovie = async (movieId) => {
    try{
        let url = utils.GET_SINGLE_MOVIE(movieId)
        let status_code;
        const response = await axios.get(url, { headers: utils.DefaultHeader })
            .then((res) => {
                console.log(res.data)
                status_code = res.status;
                return res.data;
            })
            .catch(err => {
                status_code = err.response.status;
                console.log("Erorr: "+err)
                return err
            })
            return {response, status_code}
    }catch(err){
        console.log(`Exception in fetch profile : ${err}`)
        return {response: null, status_code: null}
    }
}


export const getAllReviews = async () => {
    try{
        let status_code;
        const response = await axios.get(utils.ALL_REVIEWS, { headers: utils.DefaultHeader })
            .then((res) => {
                status_code = res.status;
                return res.data;
            })
            .catch(err => {
                status_code = err.response.status;
                console.log("Erorr: "+err)
                return err
            })
            return {response, status_code}
    }catch(err){
        console.log(`Exception in all reviews : ${err}`)
        return {response: null, status_code: null}
    }
}


export const myReviews = async (token) => {
    try{
        const header = utils.TokenHeader(token)
        let status_code;
        const response = await axios.get(utils.MY_REVIEWS, { headers: header })
            .then((res) => {
                status_code = res.status;
                return res.data;
            })
            .catch(err => {
                status_code = err.response.status;
                console.log("Erorr: "+err)
                return err
            })
            return {response, status_code}
    }catch(err){
        console.log(`Exception in my reviews : ${err}`)
        return {response: null, status_code: null}
    }
}

export const deleteReview = async (token, reviewId) => {
    try{
        const header = utils.TokenHeader(token)
        let status_code;
        const url = utils.DELETE_REVIEW(reviewId)
        const response = await axios.delete(url, { headers: header })
            .then((res) => {
                console.log(res)
                status_code = res.status;
                return res.data;
            })
            .catch(err => {
                status_code = err.response.status;
                console.log("Erorr: "+err)
                return err
            })
            return {response, status_code}
    }catch(err){
        console.log(`Exception in my reviews : ${err}`)
        return {response: null, status_code: null}
    }
}


export const updateReview = async (token, movieId, review) => {
    try{
        let status_code;
        console.log(review)
        console.log(movieId)
        const url = utils.UPDATE_REVIEW(movieId)
        const header = utils.TokenHeader(token)
        const payload = {
            content: review.content,
            rating: review.rating
        }
        const response = await axios.put(url , payload, { headers: header })
        .then((res) => {
            status_code = res.status
            return res.data
        }).catch(err => {
            status_code = err.response.status
            return err
        })
        return {response, status_code}
    }catch(err){
        console.log(`Exception in updateReview : ${err}`)
        return {response: null, status_code: null}
    }
}


export const searchMovieByTitle = async (q) => {
    try{
        let status_code;
        const url = utils.SEARCH_MOVIE_BY_TITLE(q)
        const response = await axios.get(url , { headers: utils.DefaultHeader })
        .then((res) => {
            status_code = res.status
            return res.data
        }).catch(err => {
            status_code = err.response.status
            return err
        })
        return {response, status_code}
    }catch(err){
        console.log(`Exception in search movies : ${err}`)
        return {response: null, status_code: null}
    }
}