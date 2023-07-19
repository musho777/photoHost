import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk" 
import ConfirmForgotPasswordReducer from './reducers/confirmForgotPasswordReducer';
import ConfirmRegisetReducer from './reducers/confirmRegisetReducer';
import ForgotPasswordReducer from './reducers/forgotPasswordReducer';
import GetUserDataReducer from './reducers/getUserDataReducer';
import LoginReducer from './reducers/loginReducer';
import NewPasswordReducer from './reducers/newPasswordReducer';
import RegisterReducer from './reducers/registerReducer';
import StaticReducer from './reducers/staticReducer';

const rootReducer = combineReducers({
    register:RegisterReducer,
    confirmRegister:ConfirmRegisetReducer,
    login:LoginReducer,
    forgotPassword:ForgotPasswordReducer,
    confirmForgotPassword:ConfirmForgotPasswordReducer,
    newPassword:NewPasswordReducer,
    userData:GetUserDataReducer,
    static:StaticReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk) );
