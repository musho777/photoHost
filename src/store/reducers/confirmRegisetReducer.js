const initialState = {
  error: '',
  status: false,
  message: '',
  loading: false
};
const ConfirmRegisetReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartConfirmRegisterCode':
      item.status = false
      item.error = ''
      item.message = '',
        item.loading = true
      break
    case 'SuccessConfirmRegisterCode':
      item.status = true
      item.error = ''
      item.message = action.data?.message,
        item.loading = false
      break
    case 'ErrorConfirmRegisterCode':
      item.error = action.data
      item.loading = false
      item.status = false
      break;
    case 'ClearConfirmPasswordAction':
      item.error = ''
      item.loading = false
      item.status = false
      break
    default:
      break;
  }
  return item;
};
export default ConfirmRegisetReducer;
