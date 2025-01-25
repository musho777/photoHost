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
      // item.status = false
      // item.error = ''
      // item.message = ''
      item.loading = true
      // item.data = {}
      // item.username = ''
      // item.name = ''
      // item.description = ''
      // item.email = ''
      // item.avatar = ''
      // item.followerCount = 0
      // item.followersCount = 0
      // item.postCount = 0
      // item.allData = {}
      break

    case 'SuccessLogout':
      item.status = false
      item.error = ''
      item.message = ''
      item.loading = true
      item.data = {}
      item.username = ''
      item.name = ''
      item.description = ''
      item.email = ''
      item.avatar = ''
      item.followerCount = 0
      item.followersCount = 0
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
      item.error = "no_token"
      item.loading = false
      item.status = false
      item.data = {}
      item.allData = {}
      break;
    case 'changeUserData':
      item.username = action.data.nickname
      item.name = action.data.name
      item.description = action.data.description
      break
    case 'ChangeMail':
      item.email = action.email
      break
    case 'ChangeAvatar':
      item.avatar = action.data
      break
    case 'MsgCountAction':
      item.msgCount = action.data
      break

    case 'UpdateUserInfo':
      if (item.data.city) {
        item.data.city.name = action.data.city;
      } else {
        item.data.city = { name: action.data.city };
      }
      item.data.work_grafik = action.data.work_grafik
      item.data.date_of_birth = action.data.date_of_birth
      item.data.gender = action.data.gender
      item.data.mgu = action.data.mgu
      item.data.work_type = action.data.work_type
      item.data.web = action.data.web
      item.data.phone = action.data.phone
      item.data.otrasl = action.data.otrasl
      item.data.ooo = action.data.ooo
      break

    case 'AddDeletFollowAction':
      if (action.data == 'add') {
        item.followerCount = item.followerCount + 1
      }
      else {
        item.followerCount = item.followerCount - 1
      }
      break

    case 'DelateFollower':
      item.followersCount = item.followersCount - 1
      break
    case 'ClearUser':
      item.data = {}
      item.allData = {}
      item.message = 0
      item.username = ''
      item.name = ''
      item.description = ''
      item.email = ''
      item.avatar = ''
      item.error = ''
      break

    case 'DeletLocalPhoto':
      item.postCount = item.postCount - 1
      break
    case 'CreatePostLocal':
      item.postCount = item.postCount + 1
      break
    case 'ClearChatNumber':
      item.msgCount = 0
      break
    case 'AddMessageCount':
      item.msgCount = item.msgCount + 1
      break
    // case "ShowPopUpLocal":
    //   item.data.show_category_pop_up = 1
    //   break
    // case "ClosePopUpLocal":
    //   item.data.show_category_pop_up = 0
    default:
      break;
  }
  return item;
};
export default GetUserDataReducer;
