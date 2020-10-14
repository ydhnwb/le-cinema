import * as t from './action_types';

const initialState = {
    token: null,
    user: null
};


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.FETCH_TOKEN:
            if(action.payload.user){
                return {
                    ...state,
                    token: action.payload.token,
                    user: action.payload.user
                }
            }else{
                return {
                    ...state,
                    token: action.payload.token
                }
            }

        case t.SIGN_OUT:
            return {
                ...state,
                token: action.payload.token
            };
        default:
            return state;
    }
};