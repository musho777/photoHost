const initialState = {
  error: '',
  status: false,
  message: '',
  loading: false,
};
const ChangePasswordReducer = (state = initialState, action) => {
  let item = {...state};
  switch (action.type) {
    case 'StartChangeUserPassword':
      item.status = false;
      item.error = '';
      (item.message = ''), (item.loading = true);
      break;
    case 'SuccessChangeUserPassword':
      item.status = true;
      item.error = '';
      (item.message = action.data?.message), (item.loading = false);
      break;
    case 'ErrorChangeUserPassowrd':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    case 'clearChangePassword':
      item.error = '';
      item.loading = false;
      item.status = false;
      item.message = '';
      break;
    default:
      break;
  }
  return item;
};
export default ChangePasswordReducer;
