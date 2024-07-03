const initialState = {
  error: '',
  loading: true,
  data: [],
};
const GetRelationCategoryReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetRelationCatalog':
      item.error = ''
      item.loading = true
      item.data = []
      break
    case 'SuccessGetRelationCatalog':
      item.error = ''
      item.loading = false
      item.data = action.data
      break
    case 'ErrorGetRelationCatalog':
      item.error = action.data
      item.loading = false
      item.data = []
      break;
    default:
      break;
  }
  return item;
};
export default GetRelationCategoryReducer;
