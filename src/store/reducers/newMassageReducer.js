const initialState = {
  error: '',
  status: false,
  message: '',
  loading: false,
};
const NewMassageReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartNewMessageAction':
      item.status = false
      item.error = ''
      item.message = ''
      item.loading = true
      break
    case 'SuccessNewMessageAction':
      item.status = true
      item.error = ''
      item.message = action.data?.message
      item.loading = false
      break
    case 'ErrorNewMessageAction':
      item.error = action.data
      item.loading = false
      item.status = false
      break;
    default:
      break;
  }
  return item;
};
export default NewMassageReducer;
