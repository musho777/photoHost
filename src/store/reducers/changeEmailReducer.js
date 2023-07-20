const initialState = {
    error: '',
    status: false,
    message: '',
    loading: false,
    password:false,
    passwordStatus:false,
    passwordError: '',
    passwordLoading:false,
    codeStatus:false,
    codeError:'',
    codeLoading:false,
  };
  const ChangeEmailReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartChangeEmailPassword':
        item.password = false,
        item.passwordLoading = true,
        item.passwordError = ''
        item.passwordStatus = false
        break
      case 'ErrorChangeEmailPassword':
        item.password = false,
        item.passwordLoading = false,
        item.passwordError = action.data
        item.passwordStatus = false
        break
      case 'SuccessChangeEmailPassword':
        item.password = true,
        item.passwordLoading = false,
        item.passwordError = ''
        item.passwordStatus = true
        break
      case 'StartChangeEmail':
        item.status = false;
        item.error = '';
        item.message = '', (item.loading = true);
        break;
      case 'SuccessChangeEmail':
        item.status = true;
        item.error = '';
        (item.message = action.data?.message), (item.loading = false);
        break;
      case 'ErrorChangeEmail':
        item.error = action.data;
        item.loading = false;
        item.status = false;
        break;
      case 'StartChangeEmailCode':
        item.codeStatus = false,
        item.codeError ='',
        item.codeLoading =true
        break
      case 'SuccessChangeEmailCode':
        item.codeStatus = true,
        item.codeError ='',
        item.codeLoading =false
        break
      case 'ErrorChangeEmailCode':
        item.codeStatus = false,
        item.codeError =action.data,
        item.codeLoading =false
        break
      case 'ClearEmailChange':
        item.password = false,
        item.passwordLoading = false,
        item.passwordError = ''
        item.passwordStatus = false
        item.error = '';
        item.status = false;
        item.message = ''
        item.loading = false
        item.codeStatus = false,
        item.codeError ='',
        item.codeLoading =false
        break
      default:
        break;
    }
    return item;
  };
  export default ChangeEmailReducer;
  