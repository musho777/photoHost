import {ErrorConfirmRegisterCode, ErrorRegister} from './errorAction';
import {StartConfirmRegisterCode, StartRegister} from './startAction';
import {SuccessConfirmRegisterCode, SuccessRegister} from './successAction';

const Api = 'https://chamba.justcode.am/api';

export const RegisterAction = data => {
  return dispatch => {
    dispatch(StartRegister());
    fetch(`${Api}/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessRegister(r));
        } else {
          console.log(r.message,555555555)
          dispatch(ErrorRegister({
            email:r.message.email ?'Этот эл. адрес уже зарегистрирован':'',
            username:r.message?.nickname?'Такое имя пользователя уже существует.':''
          }));
        }
      })
      .catch((error) => {
        console.log(error,555555)
        dispatch(ErrorRegister({server:'server'}));
      });
  };
};
export const ClearRegisterAction = () => {
  return {
    type: 'ClearRegisterAction',
  };
};

export const ConfirmRegisterCode = (data) =>{
    return (dispatch) =>{
        dispatch(StartConfirmRegisterCode())
        fetch(`${Api}/confirm_register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          })
            .then(response => response.json())
            .then(r => {
              if (r.status) {
                dispatch(SuccessConfirmRegisterCode(r));
              } else {
                dispatch(ErrorConfirmRegisterCode( 'код не совпадают'));
              }
            })
            .catch(error => {
              dispatch(ErrorConfirmRegisterCode( 'код не совпадают'));
            });
        };
    } 
export const ClearConfirmPasswordAction = () => {
    return {
        type:'ClearConfirmPasswordAction'
    }
}