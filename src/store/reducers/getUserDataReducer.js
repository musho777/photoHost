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

    case 'UpdateUserInfo':
      console.log(action.data[0].value, '79')
      item.data.city = action.data[0]
      item.data.date_of_birth1 = action.data[1].value
      item.data.gender = action.data[2].value
      item.data.mgu = action.data[3].value
      item.data.work_type = action.data[4].value
      item.data.web = action.data[5].value
      item.data.phone = action.data[7].value

      break

    default:
      break;
  }
  return item;
};
export default GetUserDataReducer;
