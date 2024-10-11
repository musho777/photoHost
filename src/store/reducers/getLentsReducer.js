const initialState = {
  error: '',
  status: false,
  loading: true,
  data: [],
  message: '',
  nextPage: '',
  secondLoading: false
};
const GetLentsReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetLents':
      if (action.loadingType == 'first') {
        item.error = ''
        item.status = false
        item.loading = true
        item.data = []
        item.message = ''
        item.nextPage = ''
        item.secondLoading = false
      }
      else {
        item.secondLoading = true;
      }
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
      item.secondLoading = false;

      break;
    case 'ErrorGetLents':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      item.secondLoading = false;
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
      if (inde >= 0) {
        item.data[inde].comment_count = +item.data[inde].comment_count + 1
      }
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
            let ids = item.data[iid].like_auth_user.findIndex((elm, i) => elm.user_id == action.id)
            item.data[iid].like_auth_user.splice(ids, 1)
          }
        }
      }
      break
    case 'ClearLoginAction':
      item.data = []
      break
    case 'DeletLocalPhoto':
      let ind = item.data.findIndex((elm) => elm.id == action.data.post_id)
      if (ind >= 0) {
        item.data.splice(ind, 1)
      }
      break
    case 'DelatePhotofromPost':
      let delatePhotoIndex = item.data.findIndex((elm) => elm.id == action.post_id)
      if (delatePhotoIndex >= 0) {
        let delatephotoformPostIndex = item.data[delatePhotoIndex].photo.findIndex((elm) => elm.id == action.id)
        item.data[delatePhotoIndex].photo.splice(delatephotoformPostIndex, 1)
      }
      break
    default:
      break;
  }
  return item;
};
export default GetLentsReducer;
