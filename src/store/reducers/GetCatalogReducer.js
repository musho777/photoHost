const initialState = {
  error: '',
  loading: true,
  data: [],
};
const GetCatalogReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetCatalog':
      item.error = '';
      item.loading = true;
      // item.data = []
      break;
    case 'SuccessGetCatalog':
      item.error = '';
      item.data = action.data
      item.loading = false;
      break;
    case 'ErrorGetCatalog':
      item.error = action.data;
      item.loading = false;
      item.data = []
      break;
    default:
      break;
  }
  return item;
};
export default GetCatalogReducer;
