const initialState = {
  error: '',
  status: false,
  loading: true,
  data: [],
  message: '',
  nextPage: '',
  secondLoading: false
};
const GetOtherPostsReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartOtherPostsAction':
      item.status = false;
      item.error = '';
      if (action.value == 'second') {
        item.secondLoading = true
      }
      else {
        item.loading = true;
      }
      break;
    case 'SuccessOtherPostsAction':
      item.status = true;
      item.error = '';
      if (action.data.data.current_page == 1) {
        item.data = action.data.data.data;
      }
      else if (item.nextPage != action.data.data.next_page_url) {
        item.data = [...item.data, ...action.data.data.data];
      }
      item.nextPage = action.data.data.next_page_url;
      item.loading = false;
      item.secondLoading = false

      break;
    case 'ErrorOtherPostsAction':
      item.error = action.data;
      item.loading = false;
      item.secondLoading = false
      item.status = false;
      break;

    case 'AddBookLocal':
      let i = item.data.findIndex(elm => elm.id === action.data.post_id)
      if (i != -1) {
        let ind = item.data[i].auth_user_book?.findIndex(elm => elm.user_id === action.data.userId)
        if (ind != -1) {
          item.data[i].auth_user_book.splice(ind, 1)
        }
        else {
          item.data[i].auth_user_book?.push({ user_id: action.data.userId })
        }
      }
      break

    case 'LocalLike':
      let ind = item.data.findIndex((elm) => elm.id == action.data.post_id)
      if (ind >= 0) {
        let indx = item.data[ind]?.like_auth_user?.findIndex((elm) => elm.user_id == action.id)
        if (indx >= -1) {
          if (indx == -1) {
            item.data[ind].like_count = item.data[ind]?.like_count + 1
            item.data[ind].like_auth_user.push({ user_id: action.id })
          }
          else {
            item.data[ind].like_count = item.data[ind]?.like_count - 1
            let ids = item.data[ind].like_auth_user.findIndex((elm, i) => elm.user_id == action.id)
            item.data[ind].like_auth_user.splice(ids, 1)
          }
        }
      }
      break
    default:
      break;
  }
  return item;
};
export default GetOtherPostsReducer;
