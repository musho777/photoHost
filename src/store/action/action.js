import axios from 'axios';
import {
  ErrorAddDeleteFollow,
  ErrorChangeAvatar,
  ErrorChangeEmail,
  ErrorChangeEmailCode,
  ErrorChangeEmailPassword,
  ErrorChangeProfile,
  ErrorChangeUserPassowrd,
  ErrorConfirmRegisterCode,
  ErrorDeleteOtherPople,
  ErrorForgotPassword,
  ErrorGetFollower,
  ErrorGetFollowersAction,
  ErrorGetMyChatRoom,
  ErrorGetSinglePageChat,
  ErrorGetSinglPage,
  ErrorGetUserData,
  ErrorLogin,
  ErrorLogout,
  ErrorNewMessageAction,
  ErrorNewPassword,
  ErrorRegister,
  ErrorSearch,
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
  StartChangeAvatar,
  StartSearch,
  StarGetSinglUser,
  StartAddDeleteFollow,
  StartGetFollowersAction,
  StartDeleteOtherPople,
  StartGetFollower,
  StartGetSinglePageChat,
  StartNewMessageAction,
  StartGetMyChatRoom,
  StartLogout,
} from './startAction';
import {
  SuccessAddDeleteFollow,
  SuccessChangeAvatar,
  SuccessChangeEmail,
  SuccessChangeEmailCode,
  SuccessChangeEmailPassword,
  SuccessChangeProfil,
  SuccessChangeUserPassword,
  SuccessConfirmRegisterCode,
  SuccessDeleteOtherPople,
  SuccessForgotPassword,
  SuccessGetFollower,
  SuccessGetMyChatRoom,
  SuccessGetSinglePageChat,
  SuccessGetSinglPage,
  SuccessGetUserData,
  SuccessLogin,
  SuccessLogout,
  SuccessNewMessageAction,
  SuccessNewPassword,
  SuccessRegister,
  SuccessSearch,
  SuccessValidForgotPassowrd,
  SucessGetFollowersAction,
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
          dispatch(setToken(r.token))
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
          dispatch(
            SuccessGetUserData(
              r.data.data,
              r.data.follower_count,
              r.data.followers_count,
              r.data.post_count,
            ),
          );
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
        dispatch(ErrorChangeProfile('такой пользователь уже авторизован'));
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
          if (r.message.email)
            dispatch(
              ErrorChangeEmail({
                email: 'указанный адрес электронной почты, уже существует.',
              }),
            );
        }
      })
      .catch(error => {
        dispatch(ErrorChangeEmail({server: 'server error'}));
      });
  };
};

export const sednEmailChangeCodeAction = (data, token, email) => {
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
          dispatch(ChangeMail(email));
        } else {
          dispatch(ErrorChangeEmailCode({server: 'код не совпадает'}));
        }
      })
      .catch(error => {
        dispatch(ErrorChangeEmailCode({server: 'server error'}));
      });
  };
};

export const ChangeMail = email => {
  return {
    type: 'ChangeMail',
    email,
  };
};

export const chnageAvatarAction = (url, token) => {
  return dispatch => {
    dispatch(StartChangeAvatar());
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'multipart/form-data');
    myHeaders.append('otherHeader', 'foo');
    myHeaders.append('Authorization', `Bearer ${token}`);

    let body = new FormData();
    body.append('photo', {
      uri: url,
      name: 'photo.png',
      filename: 'imageName.png',
      type: 'image/png',
    });
    body.append('Content-Type', 'image/png');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
    };

    fetch(
      'https://chamba.justcode.am/api/user_update_profile_photo',
      requestOptions,
    )
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessChangeAvatar());
          dispatch(ChangeAvatar(r.avatar));
        } else {
          dispatch(ErrorChangeAvatar());
        }
      })
      .catch(error => {
        dispatch(ErrorChangeAvatar());
      });
  };
};
export const ChangeAvatar = data => {
  return {
    type: 'ChangeAvatar',
    data,
  };
};

export const SearchAction = (data, page, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    dispatch(StartSearch());
    fetch(`${Api}/search_user?page=${page}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessSearch(r));
        } else {
          dispatch(ErrorSearch('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorSearch('server error'));
      });
  };
};

export const GetSinglPageAction = (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    dispatch(StarGetSinglUser());
    fetch(`${Api}/single_page_user`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetSinglPage(r));
        } else {
          dispatch(ErrorGetSinglPage('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetSinglPage('server error'));
      });
  };
};

export const AddDeleteFollowAction = (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    dispatch(StartAddDeleteFollow());
    fetch(`${Api}/add_new_follow_or_delete_follow_request_and_follow`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessAddDeleteFollow(r));
        } else {
          dispatch(ErrorAddDeleteFollow('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorAddDeleteFollow('server error'));
      });
  };
};

export const AddDeletFollow = id => {
  return {
    type: 'AddDeletFollow',
    id,
  };
};

export const GetFollowersAction = (data, token, page) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    dispatch(StartGetFollowersAction());
    fetch(`${Api}/get_followers?page=${page}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SucessGetFollowersAction(r));
        } else {
          dispatch(ErrorGetFollowersAction('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetFollowersAction('server error'));
      });
  };
};

export const DeleteOtherPeople = (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    dispatch(StartDeleteOtherPople());
    fetch(`${Api}/delete_other_people_in_my_followers`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessDeleteOtherPople(r));
        } else {
          dispatch(ErrorDeleteOtherPople('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorDeleteOtherPople('server error'));
      });
  };
};

export const GetFollowerAction = (data, token, page) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    dispatch(StartGetFollower());
    fetch(`${Api}/get_follower?page=${page}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetFollower(r));
        } else {
          dispatch(ErrorGetFollower('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetFollower('server error'));
      });
  };
};

export const GetSinglePageChatAction = (data, token,page) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    dispatch(StartGetSinglePageChat());
    fetch(`${Api}/single_page_chat?page=${page}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetSinglePageChat(r));
        } else {
          dispatch(ErrorGetSinglePageChat('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetSinglePageChat('server error'));
      });
  };
};

export const newMessageAction = (data,token) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    dispatch(StartNewMessageAction());
    fetch(`${Api}/new_message`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessNewMessageAction(r));
        } else {
          dispatch(ErrorNewMessageAction('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorNewMessageAction('server error'));
      });
  };
};


export const AddMsgAction = (data) =>{
  return {
    type:'AddMsgAction',
    data
  }
}

export const GetMyChatRoom = (data,token,page) =>{
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    dispatch(StartGetMyChatRoom());
    fetch(`${Api}/get_my_chat_rooms?page=${page}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetMyChatRoom(r));
        } else {
          dispatch(ErrorGetMyChatRoom('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetMyChatRoom('server error'));
      });
  };
}

export const NewMsgAction = (data) =>{
  return{
    type:'NewMsgAction',
    data
  }
}

export const LogoutAction = (token) =>{
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    dispatch(StartLogout());
    fetch(`${Api}/logout`, {
      method: 'POST',
      headers: myHeaders,
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessLogout(r));
        } else {
          dispatch(ErrorLogout('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorLogout('server error'));
      });
  };
}