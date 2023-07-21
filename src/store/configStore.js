import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk" 
import ChangeAvatarReducer from './reducers/changeAvatarReducer';
import ChangeEmailReducer from './reducers/changeEmailReducer';
import ChangePasswordReducer from './reducers/changePasswordReducer';
import ChangeUserProfilReducer from './reducers/changeUserProfilReducer';
import ConfirmForgotPasswordReducer from './reducers/confirmForgotPasswordReducer';
import ConfirmRegisetReducer from './reducers/confirmRegisetReducer';
import ForgotPasswordReducer from './reducers/forgotPasswordReducer';
import GetUserDataReducer from './reducers/getUserDataReducer';
import LoginReducer from './reducers/loginReducer';
import NewPasswordReducer from './reducers/newPasswordReducer';
import RegisterReducer from './reducers/registerReducer';
import SearchReducer from './reducers/searchReducer';
import StaticReducer from './reducers/staticReducer';

const rootReducer = combineReducers({
    register:RegisterReducer,
    confirmRegister:ConfirmRegisetReducer,
    login:LoginReducer,
    forgotPassword:ForgotPasswordReducer,
    confirmForgotPassword:ConfirmForgotPasswordReducer,
    newPassword:NewPasswordReducer,
    userData:GetUserDataReducer,
    static:StaticReducer,
    changeUserProfil:ChangeUserProfilReducer,
    changePassword:ChangePasswordReducer,
    changeEmail:ChangeEmailReducer,
    changeAvatar:ChangeAvatarReducer,
    search:SearchReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk) );
