const initialState = {
  data: {}
};
const LocalSinglPageReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'LocalSinglImage':
      item.data = action.data
      break
    // case 'LocalLike':
    //   console.log("singlPage")
    //   let indx = item.data?.like_auth_user?.findIndex((elm) => elm.user_id == action.id)
    //   console.log(indx, '22')
    //   if (indx >= -1) {
    //     if (indx == -1) {
    //       item.data.like_count = item.data?.like_count + 1
    //       item.data.like_auth_user.push({ user_id: action.id })
    //     }
    //     else {
    //       item.data.like_count = item.data?.like_count - 1
    //       let ids = item.data.like_auth_user.findIndex((elm, i) => elm.user_id == action.id)
    //       item.data.like_auth_user.splice(ids, 1)
    //     }
    //   }
    //   break

    case 'AddCommentLocal':
      item.data.comment_count = +item.data.comment_count + 1
      break

    default:
      break;
  }
  return item;
};
export default LocalSinglPageReducer;
