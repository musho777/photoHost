import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk" 
import ConfirmRegisetReducer from './reducers/confirmRegisetReducer';
import ForgotPasswordReducer from './reducers/forgotPasswordReducer';
import LoginReducer from './reducers/loginReducer';
import RegisterReducer from './reducers/registerReducer';

const rootReducer = combineReducers({
    register:RegisterReducer,
    confirmRegister:ConfirmRegisetReducer,
    login:LoginReducer,
    forgotPassword:ForgotPasswordReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk) );
