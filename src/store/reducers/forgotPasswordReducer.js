const initialState = {
    error: '',
    status:false,
    message:'',
    loading:false
  };
  const ForgotPasswordReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartForgotPassword':
        item.status = false
        item.error =''
        item.message = '',
        item.loading = true
        break
      case 'SuccessForgotPassword':
        item.status = true
        item.error =''
        item.message = action.data?.message,
        item.loading = false
        break
      case 'ErrorForgotPassword':
        item.error = action.data
        item.loading = false
        item.status = false
        break;
      case 'ClearForGotPassword':
        item.status = false
        item.error =''
        item.message = '',
        item.loading = false
      default:
        break;
    }
    return item;
  };
  export default ForgotPasswordReducer;
  