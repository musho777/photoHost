const initialState = {
  error: '',
  status: false,
  loading: true,
  data: [],
  message: '',
  nextPage: '',
  stateData: {}
};
const GetPostViewReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetPostView':
      item.status = false;
      item.error = '';
      item.loading = true;
      break;
    case 'SuccessGetPostView':
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
      item.stateData = action.data.stat_data
      break;
    case 'ErrorGetPostView':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    default:
      break;
  }
  return item;
};
export default GetPostViewReducer;
