const initialState = {
  error: '',
  status: false,
  loading: true,
  data: [],
  message: '',
  nextPage: '',
};
const GetLentsReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetLents':
      item.status = false;
      item.error = '';
      item.loading = true;
      break;
    case 'SuccessGetLents':
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
      break;
    case 'ErrorGetLents':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    case 'EditLentPhot':
      let index = item.data.findIndex(elm => elm.id === action.data.post_id)
      if (index != -1) {
        item.data[index].description = action.data.description
      }
      break

    case 'DelateCommentLocal':
      const i = item.data.findIndex(elm => elm.id === action.data.id)
      if (i >= 0) {
        item.data[i].comment_count = item.data[i].comment_count - 1
      }
      break
    case "AddCommentLocal":
      let inde = item.data.findIndex(elm => elm.id === action.data.id)
      item.data[inde].comment_count = +item.data[inde].comment_count + 1
      break

    case 'LocalLike':
      let data = item.data.find((elm) => elm.id == action.data.post_id)
      if (data) {
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
            item.data[iid].like_auth_user.splice(iid, 1)
          }
        }
      }
      break
    default:
      break;
  }
  return item;
};
export default GetLentsReducer;
