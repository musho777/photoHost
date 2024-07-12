import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  ErrorAddBlackList,
  ErrorAddComment,
  ErrorAddDeleteFollow,
  ErrorAddInBook,
  ErrorChangeAvatar,
  ErrorChangeCatalog,
  ErrorChangeEmail,
  ErrorChangeEmailCode,
  ErrorChangeEmailPassword,
  ErrorChangeProfile,
  ErrorChangeUserPassowrd,
  ErrorConfirmRegisterCode,
  ErrorCreatePost,
  ErrorDelateChat,
  ErrorDeleteOtherPople,
  ErrorDeletePost,
  ErrorEditPost,
  ErrorForgotPassword,
  ErrorGetBlackList,
  ErrorGetCatalog,
  ErrorGetCitys,
  ErrorGetFollower,
  ErrorGetFollowersAction,
  ErrorGetLents,
  ErrorGetLentsRec,
  ErrorGetMyBooks,
  ErrorGetMyChatRoom,
  ErrorGetNotification,
  ErrorGetPostComment,
  ErrorGetPostLike,
  ErrorGetPosts,
  ErrorGetRelationCatalog,
  ErrorGetSinglePageChat,
  ErrorGetSinglPage,
  ErrorGetSinglPost,
  ErrorGetUserData,
  ErrorLikePost,
  ErrorLogin,
  ErrorLogout,
  ErrorNewMessageAction,
  ErrorNewPassword,
  ErrorRegister,
  ErrorSearch,
  ErrorUpdateIKInfor,
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
  StartCreatePost,
  StartGetPosts,
  StartGetLents,
  StartLikePost,
  StartAddBlackList,
  StartGetBlackList,
  StartAddInBook,
  StartGetMyBooks,
  StartGetNotification,
  StartAddComment,
  StartGetPostComment,
  StartGetSingLPost,
  StartEditPost,
  StartGetPostLike,
  StartDelateChat,
  StartGetCiyts,
  StartUpdateIkInfo,
  StartDeletePost,
  StartGetCatalog,
  StartChangeCatalog,
  StartGetLentsRec,
  StartGetRelationCatalog,
} from './startAction';
import {
  SuccessAddBlackList,
  SuccessAddComment,
  SuccessAddDeleteFollow,
  SuccessAddInBook,
  SuccessChangeAvatar,
  SuccessChangeCatalog,
  SuccessChangeEmail,
  SuccessChangeEmailCode,
  SuccessChangeEmailPassword,
  SuccessChangeProfil,
  SuccessChangeUserPassword,
  SuccessConfirmRegisterCode,
  SuccessCreatePost,
  SuccessDelateChat,
  SuccessDelatePhost,
  SuccessDeleteOtherPople,
  SuccessEditPost,
  SuccessForgotPassword,
  SuccessGetBlackList,
  SuccessGetCatalog,
  SuccessGetCitys,
  SuccessGetFollower,
  SuccessGetLents,
  SuccessGetLentsRec,
  SuccessGetMyBooks,
  SuccessGetMyChatRoom,
  SuccessGetNotification,
  SuccessGetPostComment,
  SuccessGetPostLike,
  SuccessGetPosts,
  SuccessGetRelationCatalog,
  SuccessGetSinglePageChat,
  SuccessGetSinglPage,
  SuccessGetSinglPost,
  SuccessGetUserData,
  SuccessLogin,
  SuccessLogout,
  SuccessNewMessageAction,
  SuccessNewPassword,
  SuccessRegister,
  SuccessSearch,
  SuccessUpdateIkinfo,
  SuccessValidForgotPassowrd,
  SucessGetFollowersAction,
} from './successAction';

export const Api = 'https://chamba.digiluys.com/api';

export const RegisterAction = data => {
  return dispatch => {
    dispatch(StartRegister());
    fetch(`${Api}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        console.log(r)
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
        console.log(error)
        dispatch(ErrorRegister({ server: 'server' }));
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        setTokenSorage(r.token);
        if (r.status) {
          dispatch(setToken(r.token));
          dispatch(SuccessConfirmRegisterCode(r));
        } else {
          dispatch(ErrorConfirmRegisterCode('Неверный код'));
        }
      })
      .catch(error => {
        dispatch(ErrorConfirmRegisterCode('Неверный код'));
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(setToken(r.token));
          dispatch(SuccessLogin(r));
          setTokenSorage(r.token, r.user.id);
          dispatch(getUserInfoAction(r.token))
        } else {
          if (r.message.includes('Your account is blocked')) {
            dispatch(ErrorLogin('ваш аккаунт заблокирован'));
          } else {
            dispatch(ErrorLogin('Неверный логин или пароль'));
          }
        }
      })
      .catch(error => {
        dispatch(ErrorLogin('server error'));
      });
  };
};

async function setTokenSorage(token, id) {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('id', JSON.stringify(id));

}

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
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessValidForgotPassowrd(r));
        } else {
          dispatch(ErrorValidationForgotPassword('Неверный код'));
        }
      })
      .catch(error => {
        dispatch(ErrorValidationForgotPassword('Неверный код'));
      });
  };
};

export const NewPasswordAction = data => {
  return dispatch => {
    dispatch(StartNewPassword());
    fetch(`${Api}/add_password_from_forgot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(r => {
        if (r.data.status) {
          dispatch(
            SuccessGetUserData(
              r.data.data,
              r.data.follower_count,
              r.data.followers_count,
              r.data.post_count,
              r.data
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
        headers: { Authorization: `Bearer ${token}` },
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
            dispatch(
              ErrorChangeUserPassowrd({ email: 'Неверный старый пароль' }),
            );
          } else {
            dispatch(ErrorChangeUserPassowrd({ server: 'server error' }));
          }
        }
      })
      .catch(error => {
        dispatch(ErrorChangeUserPassowrd({ server: 'server error' }));
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
            dispatch(ErrorChangeEmailPassword({ email: 'неверный пароль' }));
          } else {
            dispatch(ErrorChangeEmailPassword({ server: 'server error' }));
          }
        }
      })
      .catch(error => {
        dispatch(ErrorChangeEmailPassword({ server: 'server error' }));
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
        dispatch(ErrorChangeEmail({ server: 'server error' }));
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
          dispatch(ErrorChangeEmailCode({ server: 'код не совпадает' }));
        }
      })
      .catch(error => {
        dispatch(ErrorChangeEmailCode({ server: 'server error' }));
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
      body: url && body,
    };

    fetch(
      'https://chamba.digiluys.com/api/user_update_profile_photo',
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

export const GetSinglePageChatAction = (data, token, page) => {
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

export const newMessageAction = (data, token, send) => {
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

export const AddMsgAction = data => {
  return {
    type: 'AddMsgAction',
    data,
  };
};

export const AddMyMSgAction = (data) => {
  return {
    type: 'AddMyMSgAction',
    data
  }
}

export const GetMyChatRoom = (data, token, page) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    if (!data.search) {
      dispatch(StartGetMyChatRoom());
    }
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
};

export const NewMsgAction = data => {
  return {
    type: 'NewMsgAction',
    data,
  };
};

export const LogoutAction = token => {
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
          DeleteTokenSorage();
          dispatch(SuccessLogout(r));
        } else {
          dispatch(ErrorLogout('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorLogout('server error'));
      });
  };
};

async function DeleteTokenSorage() {
  await AsyncStorage.removeItem('token');
}

export const CreatPostAction = (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  myHeaders.append('Authorization', `Bearer ${token}`);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };
  return dispatch => {
    dispatch(StartCreatePost());
    fetch(`${Api}/add_new_post`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessCreatePost(r));
        } else {

          dispatch(ErrorCreatePost(error));
        }
      })
      .catch(error => {
        dispatch(ErrorCreatePost(error));
      });
  };
};

export const GetPostsAction = (data, token, page) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    if (page == 1 || !page) {
      dispatch(StartGetPosts());
    }
    fetch(`${Api}/get_all_post_auth_user_or_other_user?page=${page}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetPosts(r));
        } else {
          dispatch(ErrorGetPosts('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetPosts('server error'));
      });
  };
};

export const GetLentsAction = (token, page) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    if (page == 1 || !page) {
      dispatch(StartGetLents());
    }
    fetch(`${Api}/lents?page=${page}`, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetLents(r));
        } else {
          dispatch(ErrorGetLents('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetLents('server error'));
      });
  };
};
export const GetLentsActionRec = (token, page) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    if (page == 1 || !page) {
      dispatch(StartGetLentsRec());
    }
    fetch(`${Api}/get_recommendation_posts?page=${page}`, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetLentsRec(r));
        } else {
          dispatch(ErrorGetLentsRec('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetLentsRec('server error'));

      });
  };
};

export const LikePostAction = (data, token) => {
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
    dispatch(StartLikePost());
    fetch(`${Api}/post_like`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessCreatePost(r));
        } else {
          dispatch(ErrorLikePost(error));
        }
      })
      .catch(error => {
        dispatch(ErrorLikePost(error));
      });
  };
};

export const AddBlackListAction = (data, token) => {
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
    dispatch(StartAddBlackList());
    fetch(`${Api}/add_user_in_black_list`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessAddBlackList(r));
        } else {
          dispatch(ErrorAddBlackList(error));
        }
      })
      .catch(error => {
        dispatch(ErrorAddBlackList(error));
      });
  };
};

export const GetBlackListAction = (token, page) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    if (page == 1 || !page) {
      dispatch(StartGetBlackList());
    }
    fetch(`${Api}/get_my_black_list_users?page=${page}`, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetBlackList(r));
        } else {
          dispatch(ErrorGetBlackList('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetBlackList('server error'));
      });
  };
};

export const AddInBookAction = (data, token) => {
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
    dispatch(StartAddInBook());
    fetch(`${Api}/add_post_in_book`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessAddInBook(r));
        } else {
          dispatch(ErrorAddInBook(error));
        }
      })
      .catch(error => {
        dispatch(ErrorAddInBook(error));
      });
  };
};

export const GetMyBooksAction = (token, page) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    if (page == 1 || !page) {
      dispatch(StartGetMyBooks());
    }
    fetch(`${Api}/get_my_books?page=${page}`, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetMyBooks(r));
        } else {
          dispatch(ErrorGetMyBooks('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetMyBooks('server error'));
      });
  };
};

export const AddPostViewCount = (data, token) => {
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
    dispatch(StartAddInBook());
    fetch(`${Api}/view_post_count`, requestOptions)
      .then(response => response.json())
      .then(r => {
      })
      .catch(error => {
      });
  };
};

export const GetNotificationAction = (token, page) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  return dispatch => {
    if (page == 1 || !page) {
      dispatch(StartGetNotification());
    }
    fetch(`${Api}/my_notification?page=${page}`, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetNotification(r));
        } else {
          dispatch(ErrorGetNotification('server error'));
        }
      })
      .catch(error => {
        dispatch(ErrorGetNotification('server error'));
      });
  };
}

export const AddCommentAction = (data, token, data2) => {
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
    dispatch(StartAddComment());
    fetch(`${Api}/add_comment`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(
            GelPostCommentsAction(
              data2,
              token,
              1,
            ),
          );
          dispatch(SuccessAddComment())
        }
        else {
          dispatch(ErrorAddComment('server error'))
        }
      })
      .catch(error => {
        dispatch(ErrorAddComment('server error'))
      });
  };
}

export const GelPostCommentsAction = (data, token, page) => {
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
    dispatch(StartGetPostComment());
    fetch(`${Api}/get_post_comment?page=${page}`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetPostComment(r))
        }
        else {
          dispatch(ErrorGetPostComment('server error'))
        }
      })
      .catch(error => {
        dispatch(ErrorGetPostComment('server error'))
      });
  };
}

export const LikeCommentAction = (data, token) => {
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
    dispatch(StartAddComment());
    fetch(`${Api}/comment_like`, requestOptions)
      .then(response => response.json())
      .then(r => {
      })
      .catch(error => {
      });
  };
}

export const GetSinglPostAction = (data, token) => {
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
    dispatch(StartGetSingLPost());
    fetch(`${Api}/single_page_post`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetSinglPost(r.data))
        }
        else {
          dispatch(ErrorGetSinglPost('server error'))
        }
      })
      .catch(error => {
        dispatch(ErrorGetSinglPost('server error'))
      });
  };
}

export const EditPostAction = (data, token) => {
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
    dispatch(StartEditPost());
    fetch(`${Api}/edit_post`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessEditPost(r.data))
        }
        else {
          dispatch(ErrorEditPost('server error'))
        }
      })
      .catch(error => {
        dispatch(ErrorEditPost('server error'))
      });
  };
}

export const GetPostLikeAction = (data, token, page) => {
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
    if (page == 1) {
      dispatch(StartGetPostLike());
    }
    fetch(`${Api}/get_user_liked_post?page=${page}`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetPostLike(r))
        }
        else {
          dispatch(ErrorGetPostLike('server error'))
        }
      })
      .catch(error => {
        dispatch(ErrorGetPostLike('server error'))
      });
  };
}

export const DeviceIdAction = (data, token) => {
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
    fetch(`${Api}/add_device_id`, requestOptions)
      .then(response => response.json())
      .then(r => {
      })
      .catch(error => {
      });
  };
}

export const DelateChatAction = (data, token) => {
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
    dispatch(StartDelateChat());
    fetch(`${Api}/delete_chat`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessDelateChat(r.data))
        }
        else {
          dispatch(ErrorDelateChat('server error'))
        }
      })
      .catch(error => {
        dispatch(ErrorDelateChat('server error'))
      });
  };
}

export const DeleteChatPusherAction = (data) => {
  return {
    type: 'DeleteChatPusherAction',
    data
  }
}

export const AddBlackListPusherAction = (data) => {
  return {
    type: 'AddBlackListPusherAction',
    data
  }
}

export const SinglChatPageId = (id, myid) => {
  return {
    type: 'SinglChatPageId',
    id,
    myid
  }
}

export const GetCitysAction = (data, token) => {
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
    dispatch(StartGetCiyts());
    fetch(`${Api}/get_city`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetCitys(r.data))
        }
        else {
          dispatch(ErrorGetCitys('server error'))
        }
      })
      .catch(error => {
        dispatch(ErrorGetCitys('server error'))
      });
  };
}

export const UpdateIkInfoAction = (data, token) => {
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
    dispatch(StartUpdateIkInfo());
    fetch(`${Api}/update_lk_info`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessUpdateIkinfo(r.data))
        }
        else {
          dispatch(ErrorUpdateIKInfor())
        }
      })
      .catch(error => {
        dispatch(ErrorUpdateIKInfor())
      });
  };
}

export const DelatePostAction = (data, token) => {
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
    dispatch(StartDeletePost());
    fetch(`${Api}/delete_post`, requestOptions)
      .then(response => response.json())
      .then(r => {
        console.log(r)
        if (r.status) {
          dispatch(DeletLocalPhoto(data))
          dispatch(SuccessDelatePhost(r.data))
        }
        else {
          dispatch(ErrorDeletePost())
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(ErrorDeletePost())
      });
  };
}

const DeletLocalPhoto = (data) => {
  return {
    type: 'DeletLocalPhoto',
    data
  }
}

export const MsgCountAction = (data) => {
  return {
    type: 'MsgCountAction',
    data
  }
}

export const DeletComment = (data, token, data2) => {
  return (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow',
    };

    fetch(`${Api}/delete_comment`, requestOptions)
      .then(response => response.json())
      .then(r => {
        dispatch(GelPostCommentsAction(data2, token))
      })
      .catch(error => {
      });
  };
}

export const ChnageLanguage = (lang) => {
  return {
    type: 'ChnageLanguage',
    lang
  }
}

export const GetCatalogAction = (token) => {
  return (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    dispatch(StartGetCatalog())
    fetch(`${Api}/category`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessGetCatalog(r.data))
        }
        else {
          dispatch(ErrorGetCatalog())
        }
      })
      .catch(error => {
        dispatch(ErrorGetCatalog())
      });
  };
}


export const ChangeCatalog = (token, data) => {
  return (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow',
    };
    dispatch(StartChangeCatalog())
    fetch(`${Api}/user_change_category`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          dispatch(SuccessChangeCatalog(r))
        }
        else {
          dispatch(ErrorChangeCatalog())
        }
      })
      .catch(error => {
        dispatch(ErrorChangeCatalog())
      });
  };
}

export const ClearChangeCatalog = () => {
  return {
    type: 'ClearChangeCatalog'
  }
}



export const GetRelationCategory = (token) => {
  return (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    dispatch(StartGetRelationCatalog())
    fetch(`${Api}/get_relation_category`, requestOptions)
      .then(response => response.json())
      .then(r => {
        console.log(r, '11', token)
        if (r.status) {
          dispatch(SuccessGetRelationCatalog(r.data))
        }
        else {
          dispatch(ErrorGetRelationCatalog())
        }
      })
      .catch(error => {
        dispatch(ErrorGetRelationCatalog())
      });
  };
}


export const NoShowPopup = (token) => {
  return (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(`${Api}/no_show_pop_up`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
        }
        else {
        }
      })
      .catch(error => {
      });
  };
}

// export const Clear
// /api/no_show_pop_up