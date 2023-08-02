const initialState = {
    error: '',
    status:false,
    message:'',
    loading:false,
    token:'',
    logoutStatus:false,
    logoutLoading:false,
    logoutError:''
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
        item.logoutStatus = false
        item. logoutError = ''
        item.logoutLoading = false
        break
      case 'SuccessLogin':
        item.status = true
        item.error =''
        item.message = action.data?.message,
        item.loading = false
        item.token = action.data.token
        item.logoutStatus = false
        
        break
      case 'ErrorLogin':
        item.error = action.data
        item.loading = false
        item.status = false
        item.message = ''
        item.token = ''
        item.logoutStatus = false
        break;
      case 'ClearLoginAction':
        item.status = false
        item.error =''
        item.message = '',
        item.loading = false
        item.token = ''
        break
      case 'SuccessLogout':
        item.logoutStatus = true
        item.logoutLoading = false
        item.logoutError = ''
        item.token = ''
        break
      case 'ErrorLogout':
        item.logoutStatus = false
        item.logoutLoading = false
        item.logoutError = action.data
        break
      case 'StartLogout':
        item.logoutStatus = false
        item.logoutLoading = true
        item.logoutError = ''
      break
      default:
        break;
    }
    return item;
  };
  export default LoginReducer;
  