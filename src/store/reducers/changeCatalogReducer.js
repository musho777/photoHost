const initialState = {
  error: false,
  status: false,
  loading: false,
  data: {}
};
const ChangeCatalogReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartChangeCatalog':
      item.error = false
      item.status = false
      item.loading = true
      item.data = {}
      break
    case 'SuccessChangeCatalog':
      item.error = false
      item.status = true
      item.loading = false
      item.data = action.data
      break
    case 'ErrorChangeCatalog':
      item.error = false
      item.status = false
      item.loading = false
      item.data = {}
      break
    case 'ClearChangeCatalog':
      item.error = false
      item.status = false
      item.loading = false
      item.data = {}
      break;
    default:
      break;
  }
  return item;
};
export default ChangeCatalogReducer;
