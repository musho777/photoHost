const initialState = {
  error: '',
  status: false,
  message: '',
  loading: false,
  nextPage: null,
  data: []
};
const SearchReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartSearch':
      item.status = false;
      item.error = '';
      item.message = ''
      item.loading = true;
      break;
    case 'SuccessSearch':
      item.status = true;
      item.error = '';
      item.message = action.data?.message
      item.loading = false;

      item.data = [...item.data, ...action.data.data.data];
      item.nextPage = action.data.data.next_page_url
      break;
    case 'ErrorSearch':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    case 'clearSearchData':
      item.data = [];
      break
    default:
      break;
  }
  return item;
};
export default SearchReducer;
