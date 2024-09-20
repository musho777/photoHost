const initialState = {
  error: '',
  status: false,
  loading: true,
  data: [],
  message: '',
  nextPage: '',
  secondLoading: false,
};
const GetPostsReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetPosts':
      if (action.loadingType == 'first') {
        item.loading = true;
        item.status = false;
        item.error = '';
      }
      else {
        item.secondLoading = true
      }
      break;
    case 'SuccessGetPosts':
      item.status = true;
      item.error = '';
      if (action.data.data.current_page == 1) {
        item.data = action.data.data.data;
      }
      else if (item.nextPage != action.data.data.next_page_url) {
        action.data.data.data.map((elm, i) => {
          if (item.data.findIndex((el) => el.id == elm.id) == -1) {
            item.data.push(elm)
          }
        })
        // item.data = [...item.data, ...action.data.data.data];
      }
      item.nextPage = action.data.data.next_page_url;
      item.loading = false;
      item.secondLoading = false
      break;
    case 'ErrorGetPosts':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      item.secondLoading = false
      break;
    case 'DeletLocalPhoto':
      let data = item.data
      const postId = action.data.post_id
      const index = data.findIndex((elm) => elm.id == postId)
      data.splice(index, 1)
      item.data = data
      break

    case 'AddCommentLocal':
      let inde = item.data.findIndex(elm => elm.id === action.data.id)
      if (inde >= 0) {
        item.data[inde].comment_count = +item.data[inde].comment_count + 1
      }
      break

    case 'EditLentPhot':
      let i = item.data.findIndex(elm => elm.id === action.data.post_id)
      if (i != -1) {
        item.data[i].description = action.data.description
      }
      break

    case 'LocalLike':
      let data1 = item.data.find((elm) => elm.id == action.data.post_id)
      if (data1) {
        let iid = item.data.findIndex((elm) => elm.id == action.data.post_id)
        let indx = item.data[iid]?.like_auth_user.findIndex((elm) => elm.user_id == action.id)
        if (indx == -1) {
          if (item.data[iid]) {
            item.data[iid].like_count = item.data[iid]?.like_count + 1
            item.data[iid].like_auth_user.push({ user_id: action.id })
          }
        }
        else {
          if (item.data[iid]) {

            item.data[iid].like_count = item.data[iid]?.like_count - 1
            let ids = item.data[iid].like_auth_user.findIndex((elm, i) => elm.user_id == action.id)
            item.data[iid].like_auth_user.splice(ids, 1)
          }
        }
      }
      break
    default:
      break;
  }
  return item;
};
export default GetPostsReducer;
