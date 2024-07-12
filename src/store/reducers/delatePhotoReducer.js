const initialState = {
  error: '',
  status: false,
  loading: false
};
const DelatePhotoReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartDeletePost':
      item.status = false
      item.error = ''
      item.loading = true
      break
    case 'SuccessDelatePhost':
      item.status = true
      item.error = ''
      item.loading = false
      break
    case 'ErrorDeletePost':
      item.error = action.data
      item.loading = false
      item.status = false
      break;
    case 'ClearDelatePhost':
      item.error = ''
      item.loading = false
      item.status = false
    default:
      break;
  }
  return item;
};
export default DelatePhotoReducer;
