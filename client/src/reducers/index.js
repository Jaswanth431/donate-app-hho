import authenticationReducer from "./authentication";
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLoggedIn:authenticationReducer
});

export default  allReducers;