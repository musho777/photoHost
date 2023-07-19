const initialState = {
  error: '',
  status:false,
  code:null,
  message:'',
  loading:false
};
const RegisterReducer = (state = initialState, action) => {
  let item = {...state};
  switch (action.type) {
    case 'StartRegister':
      item.status = false
      item.error =''
      item.code = null
      item.message = '',
      item.loading = true
      break
    case 'SuccessRegister':
      item.status = true
      item.error =''
      item.code = action.data?.code
      item.message = action.data?.message,
      item.loading = false
      break
    case 'ErrorRegister':
      item.error = action.data;
      item.loading = false
      item.status = false
      item.code = ''
      break;
    case 'ClearRegisterAction':
      item.status = false
      item.error =''
      item.code = ''
      item.message = ''
      break;
    default:
      break;
  }
  return item;
};
export default RegisterReducer;
