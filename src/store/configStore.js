import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk" 
import ConfirmRegisetReducer from './reducers/confirmRegisetReducer';
import RegisterReducer from './reducers/registerReducer';

const rootReducer = combineReducers({
    register:RegisterReducer,
    confirmRegister:ConfirmRegisetReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk) );
