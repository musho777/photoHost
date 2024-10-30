const initialState = {
  error: '',
  status: false,
  message: '',
  loading: true,
  data: {},
};
const GetSinglPostReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetSingLPost':
      item.status = false
      item.error = ''
      item.message = ''
      item.loading = true
      item.data = {}
      break
    case 'SuccessGetSinglPost':
      item.status = true
      item.error = ''
      item.message = action.data?.message,
        item.loading = false
      item.data = action.data
      break
    case 'ErrorGetSinglPost':
      item.error = action.data
      item.loading = false
      item.status = false
      item.data = {}
      break;
    default:
      break;
  }
  return item;
};
export default GetSinglPostReducer;
