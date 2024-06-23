import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import AddDeleteFollowReducer from './reducers/addDeleteFollowReducer';
import ChangeAvatarReducer from './reducers/changeAvatarReducer';
import ChangeEmailReducer from './reducers/changeEmailReducer';
import ChangePasswordReducer from './reducers/changePasswordReducer';
import ChangeUserProfilReducer from './reducers/changeUserProfilReducer';
import ConfirmForgotPasswordReducer from './reducers/confirmForgotPasswordReducer';
import ConfirmRegisetReducer from './reducers/confirmRegisetReducer';
import CreatePostReducer from './reducers/createPostReducer';
import DeletOtherPeopleReducer from './reducers/deletOtherPeopleReducer';
import EditPostReducer from './reducers/editPostReducer';
import ForgotPasswordReducer from './reducers/forgotPasswordReducer';
import GetBlackListReducer from './reducers/getBlackListReducer';
import GetFollowerReducer from './reducers/getFollowerReducer';
import GetFollowersReducer from './reducers/getFollowersReducer';
import GetLentsReducer from './reducers/getLentsReducer';
import GetMyBooksReducer from './reducers/getMyBooksReducer';
import GetMyChatRoomReducer from './reducers/getMyChatRoomReducer';
import GetNotificationReducer from './reducers/getNotificationReducer';
import GetPostCommentsReducer from './reducers/getPostCommentsReducer';
import GetPostLikeReducer from './reducers/getPostLikeReducer';
import GetPostsReducer from './reducers/getPostsReducer';
import GetSinglePageChatReducer from './reducers/getSinglePageChatReducer';
import GetSinglPage from './reducers/getSinglPage';
import GetSinglPostReducer from './reducers/getSinglPostReducer';
import GetUserDataReducer from './reducers/getUserDataReducer';
import LikePostReducer from './reducers/likePostReducer';
import LoginReducer from './reducers/loginReducer';
import NewPasswordReducer from './reducers/newPasswordReducer';
import RegisterReducer from './reducers/registerReducer';
import SearchReducer from './reducers/searchReducer';
import StaticReducer from './reducers/staticReducer';
import DeletChatPusherReducer from './reducers/DeletChatPusherReducer';
import AddBlackListPussherReducer from './reducers/addBlackListPussherReducer';
import GetCityesReducer from './reducers/getCityesReducer';
import MsgCountReducer from './reducers/MsgCountReducer';
import MainReducer from './reducers/MainReducer';

const rootReducer = combineReducers({
    register: RegisterReducer,
    confirmRegister: ConfirmRegisetReducer,
    login: LoginReducer,
    forgotPassword: ForgotPasswordReducer,
    confirmForgotPassword: ConfirmForgotPasswordReducer,
    newPassword: NewPasswordReducer,
    userData: GetUserDataReducer,
    static: StaticReducer,
    changeUserProfil: ChangeUserProfilReducer,
    changePassword: ChangePasswordReducer,
    changeEmail: ChangeEmailReducer,
    changeAvatar: ChangeAvatarReducer,
    search: SearchReducer,
    singlPage: GetSinglPage,
    addDeleteFollow: AddDeleteFollowReducer,
    getFollowers: GetFollowersReducer,
    delete: DeletOtherPeopleReducer,
    getFollower: GetFollowerReducer,
    getSinglePageChat: GetSinglePageChatReducer,
    getMyChatRoom: GetMyChatRoomReducer,
    createPost: CreatePostReducer,
    getPosts: GetPostsReducer,
    getLents: GetLentsReducer,
    like: LikePostReducer,
    blackList: GetBlackListReducer,
    books: GetMyBooksReducer,
    notification: GetNotificationReducer,
    getComments: GetPostCommentsReducer,
    getSinglPage: GetSinglPostReducer,
    editPost: EditPostReducer,
    getPostLike: GetPostLikeReducer,
    deletChatPusher: DeletChatPusherReducer,
    addBlackPusher: AddBlackListPussherReducer,
    getCitys: GetCityesReducer,
    msgCount: MsgCountReducer,
    mainData: MainReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
