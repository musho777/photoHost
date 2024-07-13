const initialState = {
  error: '',
  status: false,
  loading: true,
  data: [],
  message: '',
  nextPage: '',
};
const GetOtherPostsReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartOtherPostsAction':
      item.status = false;
      item.error = '';
      item.loading = true;
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
      break;
    case 'ErrorOtherPostsAction':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    default:
      break;
  }
  return item;
};
export default GetOtherPostsReducer;
