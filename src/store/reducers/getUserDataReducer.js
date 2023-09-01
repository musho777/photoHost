const initialState = {
  error: '',
  status: false,
  message: '',
  loading: true,
  data: {},
  username: '',
  name: '',
  description: '',
  email: '',
  avatar: '',
  followerCount: 0,
  followersCount: 0,
  postCount: 0,
  allData: {},
  msgCount: ''
};
const GetUserDataReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetUserData':
      item.status = false
      item.error = ''
      item.message = '',
        item.loading = true
      item.data = {}
      item.username = '',
        item.name = '',
        item.description = ''
      item.email = ''
      item.avatar = ''
      item.followerCount = 0,
        item.followersCount = 0,
        item.postCount = 0
      item.allData = {}
      break
    case 'SuccessGetUserData':
      item.status = true
      item.error = ''
      item.message = action.data?.message
      item.loading = false
      item.data = action.data
      item.username = action.data.nickname
      item.name = action.data.name
      item.description = action.data.description
      item.email = action.data.email
      item.avatar = action.data.avatar
      item.followerCount = action.follower_count
      item.followersCount = action.followers_count
      item.postCount = action.post_count
      item.allData = action.allData
      item.msgCount = action.allData.chat_count
      break
    case 'ErrorGetUserData':
      item.error = action.data
      item.loading = false
      item.status = false
      item.data = {}
      item.allData = {}
      break;
    case 'changeUserData':
      item.username = action.data.nickname,
        item.name = action.data.name,
        item.description = action.data.description
      break
    case 'ChangeMail':
      item.email = action.email
      break
    case 'ChangeAvatar':
      item.avatar = action.data
      break
    // case 'NewMsgAction':
    //   break
    case 'MsgCountAction':
      item.msgCount = action.data
      break
    default:
      break;
  }
  return item;
};
export default GetUserDataReducer;
