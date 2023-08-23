const initialState = {
  error: '',
  status: false,
  message: '',
  loading: false,
  username: '',
  code: '',
  email: ''
};
const ConfirmForgotPasswordReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartValidationForgotPassword':
      item.status = false;
      item.error = '';
      item.message = '',
        item.loading = true;
      item.username = ''
      item.code = '',
        item.email = ''
      break;
    case 'SuccessValidForgotPassowrd':
      item.status = true;
      item.error = '';
      item.message = action.data?.message,
        item.loading = false;
      item.username = action.data.nickname
      item.code = action.data.code,
        item.email = action.data.email
      break;
    case 'ErrorValidationForgotPassword':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    case 'ClearValidationForgotPassword':
      item.status = false;
      item.error = '';
      item.message = '';
      item.loading = false
      item.username = ''
      item.code = '',
        item.email = ''
      break;
    default:
      break;
  }
  return item;
};
export default ConfirmForgotPasswordReducer;
