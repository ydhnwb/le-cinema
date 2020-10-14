import * as t from './action_types';

const initialState = {
    genres: null,
    movies: null,
    popularMovies: null
};


export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.FETCH_GENRES:
            return { ...state,genres: action.payload.genres}
        case t.GET_MOVIES_BY_GENRE_ID:
            return {...state, movies: null}
        case t.GET_POPULAR_MOVIES:
            return {...state, popularMovies: action.payload.popularMovies}
        case t.FETCH_ALL_MOVIES:
            return {...state, movies: action.payload.movies }
        default:
            return state;
    }
};