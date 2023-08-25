const initialState = {
  error: '',
  status: false,
  message: '',
  loading: true,
  nextPage: null,
  data: [],
};
const GetFollowersReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetFollowersAction':
      item.status = false;
      item.error = '';
      (item.message = ''), (item.loading = true);
      break;
    case 'SucessGetFollowersAction':
      item.status = true;
      item.error = '';
      item.message = action.data?.message,
        item.loading = false;
      if (action.data.data.current_page == 1) {
        item.data = action.data.data.data;
      }
      else if (item.nextPage != action.data.data.next_page_url) {
        item.data = [...item.data, ...action.data.data.data];
      }
      item.nextPage = action.data.data.next_page_url;
      break;
    case 'ErrorGetFollowersAction':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    case 'clearGetFollowersAction':
      item.data = [];
      break
    default:
      break;
  }
  return item;
};
export default GetFollowersReducer;
