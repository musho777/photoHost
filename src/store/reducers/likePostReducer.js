const initialState = {
  error: '',
  status: false,
  message: '',
  loading: false,
};
const LikePostReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartLikePost':
      item.status = false
      item.error = ''
      item.message = '',
        item.loading = true
      break
    case 'SuccessLikePost':
      item.status = true
      item.error = ''
      item.message = action.data?.message,
        item.loading = false
      break
    case 'ErrorLikePost':
      item.error = action.data
      item.loading = false
      item.status = false
      item.message = action.data?.message
      break;
    default:
      break;
  }
  return item;
};
export default LikePostReducer;
