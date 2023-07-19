import {ErrorConfirmRegisterCode, ErrorLogin, ErrorRegister} from './errorAction';
import {StartConfirmRegisterCode, StartLogin, StartRegister} from './startAction';
import {SuccessConfirmRegisterCode, SuccessLogin, SuccessRegister} from './successAction';

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
          dispatch(
            ErrorRegister({
              email: r.message.email
                ? 'Этот эл. адрес уже зарегистрирован'
                : '',
              username: r.message?.nickname
                ? 'Такое имя пользователя уже существует.'
                : '',
            }),
          );
        }
      })
      .catch(error => {
        dispatch(ErrorRegister({server: 'server'}));
      });
  };
};
export const ClearRegisterAction = () => {
  return {
    type: 'ClearRegisterAction',
  };
};

export const ConfirmRegisterCode = data => {
  return dispatch => {
    dispatch(StartConfirmRegisterCode());
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
          dispatch(ErrorConfirmRegisterCode('код не совпадают'));
        }
      })
      .catch(error => {
        dispatch(ErrorConfirmRegisterCode('код не совпадают'));
      });
  };
};
export const ClearConfirmPasswordAction = () => {
  return {
    type: 'ClearConfirmPasswordAction',
  };
};

export const LoginAction = (data) =>{
  return (dispatch) =>{
    dispatch(StartLogin());
    fetch(`${Api}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessLogin(r));
        } else {
          dispatch(ErrorLogin('wrong email or password'));
        }
      })
      .catch(error => {
        dispatch(ErrorLogin('server error'));
      });
  }
}

export const ClearLoginAction = () =>{
  return {
    type:'ClearLoginAction'
  }
}