const initialState = {
    error: '',
    status:false,
    message:'',
    loading:false,
    token:''
  };
  const LoginReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartLogin':
        item.status = false
        item.error =''
        item.message = '',
        item.loading = true
        item.token = ''
        break
      case 'SuccessLogin':
        item.status = true
        item.error =''
        item.message = action.data?.message,
        item.loading = false
        item.token = action.data.token
        break
      case 'ErrorLogin':
        item.error = action.data
        item.loading = false
        item.status = false
        item.message = ''
        item.token = ''
        break;
      case 'ClearLoginAction':
        item.status = false
        item.error =''
        item.message = '',
        item.loading = false
        item.token = ''
      default:
        break;
    }
    return item;
  };
  export default LoginReducer;
  