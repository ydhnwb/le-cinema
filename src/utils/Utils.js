export const MOVIE_ENDPOINT = "https://warm-bastion-18573.herokuapp.com/"
export const MOVIE_ENDPOINT_MASTER = "https://quiet-hollows-95792.herokuapp.com/"
export const MOVIE_LOGIN = `${MOVIE_ENDPOINT}login`
export const MOVIE_REGISTER = `${MOVIE_ENDPOINT}register`
export const USER_PROFILE = `${MOVIE_ENDPOINT}user`
export const MOVIE_ALL = `${MOVIE_ENDPOINT}`
export const ALL_REVIEWS = `${MOVIE_ENDPOINT}review/allreviews`
export const MY_REVIEWS = `${MOVIE_ENDPOINT}review`
export const CREATE_REVIEW = (movieId) => {
    return `${MOVIE_ENDPOINT}review?MovieId=${movieId}`
}
export const DELETE_REVIEW = (movieId) => {
    return `${MOVIE_ENDPOINT}review?id=${movieId}`
}

export const UPDATE_REVIEW = (movieId) => {
    return `${MOVIE_ENDPOINT}review?MovieId=${movieId}`
}

export const GET_SINGLE_MOVIE = (movieId) => {
    return `${MOVIE_ENDPOINT}movie/getSingleMovie?id=${movieId}`
}

export const SEARCH_MOVIE_BY_TITLE = (q) => {
    return `${MOVIE_ENDPOINT}titlesearch?title=${q}`
}

export const UPDATE_USER = `${MOVIE_ENDPOINT}user/edit`
export const UPDATE_USER_IMAGE = `${MOVIE_ENDPOINT}user/edit/image`

export const imagePatcher = (imageUrl) => {
    if(imageUrl.startsWith("http")){
        return imageUrl
    }
    return `${MOVIE_ENDPOINT}${imageUrl}`
}
export const TokenHeader = (token) => { 
    return {
        token: token
    }
 }


export const ENDPOINT = "https://be-kickin.herokuapp.com/api/v1/"
export const DefaultHeader = {
    "Content-Type":"application/json"
}

export const TMDB_API_KEY = "?api_key=781eb13279207d3b00115859616b4710"
export const TMDB_ENDPOINT = "https://api.themoviedb.org/3/"
export const TMDB_MOVIE_BY_GENRES = (genreId) =>  {
    return TMDB_ENDPOINT+"discover/movie"+TMDB_API_KEY+"&with_genres="+genreId
}
export const TMDB_POPULAR = TMDB_ENDPOINT+"movie/popular"+TMDB_API_KEY

export const extractYuotubeKey = (youtubeUrl) => {
    try{
        let splitted = ""
        splitted = youtubeUrl.split("watch?v=")[1]
        if(splitted.includes('/')){
            splitted = splitted.split('/')[0]
        }
        console.log(splitted)
        return splitted
    }catch(e){
        console.log(e)
        return ""
    }
}