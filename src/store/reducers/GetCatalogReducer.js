const initialState = {
  error: '',
  loading: true,
  data: [],
  nextPage: '',
};
const GetCatalogReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetCatalog':
      item.error = '';
      item.loading = true;
      break;
    case 'SuccessGetCatalog':
      item.error = '';
      item.nextPage = action.data.next_page_url
      if (action.data.data) {
        action.data?.data.map((elm, i) => {
          if (item.data.findIndex((temp) => temp.id == elm.id) == -1)
            item.data.push(elm)
        })
      }
      else {
        item.data = action.data
      }
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
