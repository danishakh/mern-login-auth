import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
const isEmpty = require("is-empty");

// define our initial state
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

// define how our state should change based on the action
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,   // current state
                isAuthenticated: !isEmpty(action.payload),      // enable this boolean if payload exists
                user: action.payload    // user's id and name from JTW token payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}