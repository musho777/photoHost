const initialState = {
  error: '',
  status: false,
  loading: false,
};
const UpdateUserInfoReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartUpdateIkInfo':
      item.status = false
      item.error = ''
      item.loading = true
      break
    case 'SuccessUpdateIkinfo':
      item.status = true
      item.error = ''
      item.loading = false
      break
    case 'ErrorUpdateIKInfor':
      item.error = action.data
      item.loading = false
      item.status = false
      break;
    case 'ClearChangeProfile':
      item.error = ''
      item.loading = false
      item.status = false
      break;
    case 'ClearChangeProfileTrue':
      item.error = ''
      item.status = true
    default:
      break;
  }
  return item;
};
export default UpdateUserInfoReducer;
