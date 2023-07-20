import axios from 'axios';
import {
  ErrorChangeEmail,
  ErrorChangeEmailCode,
  ErrorChangeEmailPassword,
  ErrorChangeProfile,
  ErrorChangeUserPassowrd,
  ErrorConfirmRegisterCode,
  ErrorForgotPassword,
  ErrorGetUserData,
  ErrorLogin,
  ErrorNewPassword,
  ErrorRegister,
  ErrorValidationForgotPassword,
} from './errorAction';
import {
  StartChangeData,
  StartChangeEmail,
  StartChangeEmailCode,
  StartChangeEmailPassword,
  StartChangeUserPassword,
  StartConfirmRegisterCode,
  StartForgotPassword,
  StartGetUserData,
  StartLogin,
  StartNewPassword,
  StartRegister,
  StartValidationForgotPassword,
} from './startAction';
import {
  SuccessChangeEmail,
  SuccessChangeEmailCode,
  SuccessChangeEmailPassword,
  SuccessChangeProfil,
  SuccessChangeUserPassword,
  SuccessConfirmRegisterCode,
  SuccessForgotPassword,
  SuccessGetUserData,
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

export const NewPasswordAction = data => {
  return dispatch => {
    dispatch(StartNewPassword());
    fetch(`${Api}/add_password_from_forgot`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessNewPassword(r));
        } else {
          dispatch(ErrorNewPassword(''));
        }
      })
      .catch(error => {
        dispatch(ErrorNewPassword(''));
      });
  };
};

export const getUserInfoAction = token => {
  return dispatch => {
    dispatch(StartGetUserData());
    axios
      .get(`${Api}/auth_user_info`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(r => {
        if (r.data.status) {
          dispatch(SuccessGetUserData(r.data.data));
        } else {
          dispatch(ErrorGetUserData());
        }
      })
      .catch(error => {
        dispatch(ErrorGetUserData());
      });
  };
};

export const chnageUserProfil = (data, token) => {
  return dispatch => {
    dispatch(StartChangeData());
    axios
      .post(`${Api}/update_profile`, data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(r => {
        if (r.data.status) {
          dispatch(SuccessChangeProfil(r.data));
          dispatch(changeUserData(data));
        } else {
          dispatch(ErrorChangeProfile());
        }
      })
      .catch(error => {
        dispatch(ErrorChangeProfile());
      });
  };
};

export const changeUserData = data => {
  return {
    type: 'changeUserData',
    data,
  };
};

export const setToken = token => {
  return {
    type: 'setToken',
    token,
  };
};

export const changeUserPassword = (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  };
  return dispatch => {
    dispatch(StartChangeUserPassword());
    fetch(`${Api}/update_password`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessChangeUserPassword(r.data));
        } else {
          if (r.message.includes('wrong old password')) {
            dispatch(ErrorChangeUserPassowrd({email: 'неверны старый пароль'}));
          } else {
            dispatch(ErrorChangeUserPassowrd({server: 'server error'}));
          }
        }
      })
      .catch(error => {
        dispatch(ErrorChangeUserPassowrd({server: 'server error'}));
      });
  };
};

export const ChangeEmailFirstAction = (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  };
  return dispatch => {
    dispatch(StartChangeEmailPassword());
    fetch(`${Api}/validation_password_from_email`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessChangeEmailPassword(r.data));
        } else {
          if (r.message.includes('Mo Valid password')) {
            dispatch(ErrorChangeEmailPassword({email: 'неверный пароль'}));
          } else {
            dispatch(ErrorChangeEmailPassword({server: 'server error'}));
          }
        }
      })
      .catch(error => {
        dispatch(ErrorChangeEmailPassword({server: 'server error'}));
      });
  };
};

export const ChangeEmailAction = (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  };
  return dispatch => {
    dispatch(StartChangeEmail());
    fetch(`${Api}/update_email_send_code`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessChangeEmail(r.data));
        } else {
          if(r.message.email)
          dispatch(ErrorChangeEmail({email:'указанный адрес электронной почты, уже существует.'}));
        }
      })
      .catch(error => {
        dispatch(ErrorChangeEmail({server: 'server error'}));
      });
  };
};

export const sednEmailChangeCodeAction = (data,token,email) =>{
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  };
  return dispatch => {
    dispatch(StartChangeEmailCode());
    fetch(`${Api}/validation_update_email_send_code`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessChangeEmailCode(r.data));
          dispatch(ChangeMail(email))
        } else {
          dispatch(ErrorChangeEmailCode({server: 'код не совпадает'}));
        }
      })
      .catch(error => {
        dispatch(ErrorChangeEmailCode({server: 'server error'}));
      });
  }; 
}

export const ChangeMail = (email) =>{
  return {
    type:'ChangeMail',
    email
  }
}