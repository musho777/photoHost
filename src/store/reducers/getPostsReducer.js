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
    case 'DelatePhotofromPost':
      let delatePhotoIndex = item.data.findIndex((elm) => elm.id == action.post_id)
      if (delatePhotoIndex >= 0) {
        let delatephotoformPostIndex = item.data[delatePhotoIndex].photo.findIndex((elm) => elm.post_id == action.id)
        item.data[delatePhotoIndex].photo.splice(delatephotoformPostIndex, 1)
      }
      break
    default:
      break;
  }
  return item;
};
export default GetPostsReducer;
