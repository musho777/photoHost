const initialState = {
  error: '',
  status: false,
  loading: true,
  data: [],
  message: '',
  nextPage: '',
};
const GetPostsReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetPosts':
      item.status = false;
      item.error = '';
      item.loading = true;
      break;
    case 'SuccessGetPosts':
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
    case 'ErrorGetPosts':
      item.error = action.data;
      item.loading = false;
      item.status = false;
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
      console.log(inde, 'ind', item.data[inde].comment_count)
      item.data[inde].comment_count = +item.data[inde].comment_count + 1
      break

    case 'EditLentPhot':
      let i = item.data.findIndex(elm => elm.id === action.data.post_id)
      if (i != -1) {
        item.data[i].description = action.data.description
      }
      break
    default:
      break;
  }
  return item;
};
export default GetPostsReducer;
