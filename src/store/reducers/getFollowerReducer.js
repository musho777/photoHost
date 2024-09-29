const initialState = {
  error: '',
  status: false,
  message: '',
  loading: true,
  nextPage: null,
  data: [],
};
const GetFollowerReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetFollower':
      item.status = false;
      item.error = '';
      item.message = ''
      item.loading = true;
      break;
    case 'SuccessGetFollower':
      item.status = true;
      item.error = '';
      item.message = action.data?.message
      item.loading = false;
      if (action.data.data.current_page == 1) {
        item.data = action.data.data.data;
      }
      else if (item.nextPage != action.data.data.next_page_url) {
        item.data = [...item.data, ...action.data.data.data];
      }
      item.nextPage = action.data.data.next_page_url;
      break;
    case 'ErrorGetFollower':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    case "ClearFollowrs":
      item.loading = true
      item.error = ""
      item.status = false
      item.message = ""
      item.loading = true
      item.nextPage = null
      item.data = []
      break
    default:
      break;
  }
  return item;
};
export default GetFollowerReducer;
