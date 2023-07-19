import axios from 'axios';
import {
  ErrorConfirmRegisterCode,
  ErrorForgotPassword,
  ErrorLogin,
  ErrorNewPassword,
  ErrorRegister,
  ErrorValidationForgotPassword,
} from './errorAction';
import {
  StartConfirmRegisterCode,
  StartForgotPassword,
  StartLogin,
  StartNewPassword,
  StartRegister,
  StartValidationForgotPassword,
} from './startAction';
import {
  SuccessConfirmRegisterCode,
  SuccessForgotPassword,
  SuccessLogin,
  SuccessNewPassword,
  SuccessRegister,
  SuccessValidForgotPassowrd,
} from './successAction';

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

export const LoginAction = data => {
  return dispatch => {
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
  };
};

export const ClearLoginAction = () => {
  return {
    type: 'ClearLoginAction',
  };
};

export const ForgotPasswordAction = data => {
  return dispatch => {
    dispatch(StartForgotPassword());
    fetch(`${Api}/send_code_from_forgot_password`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessForgotPassword(r));
        } else {
          dispatch(ErrorForgotPassword('такой пользователь не существует'));
        }
      })
      .catch(error => {
        dispatch(ErrorForgotPassword('server error'));
      });
  };
};

export const ValidationForogtPasswordAction = data => {
  return dispatch => {
    dispatch(StartValidationForgotPassword());
    fetch(`${Api}/validation_forgot_code`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessValidForgotPassowrd(r));
        } else {
          dispatch(ErrorValidationForgotPassword('код не совпадают'));
        }
      })
      .catch(error => {
        dispatch(ErrorValidationForgotPassword('код не совпадают'));
      });
  };
};

export const NewPasswordAction = (data) =>{
  return (dispatch) =>{
    dispatch(StartNewPassword());
    fetch(`${Api}/validation_forgot_code`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        console.log(r)
        if (r.status) {
          console.log(r);
          dispatch(SuccessNewPassword(r));
        } else {
          dispatch(ErrorNewPassword(''));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(ErrorNewPassword(''));
      });
  }
}