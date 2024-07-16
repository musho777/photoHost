const initialState = {
  error: '',
  status: false,
  loading: false,
  data: [],
  message: '',
  nextPage: '',
};
const GetLentsActionRecReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetLentsRec':
      item.status = false;
      item.error = '';
      item.loading = true;
      break;
    case 'SuccessGetLentsRec':
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
    case 'ErrorGetLentsRec':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    default:
      break;
  }
  return item;
};
export default GetLentsActionRecReducer;
