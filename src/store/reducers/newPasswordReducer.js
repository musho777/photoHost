const initialState = {
    error: '',
    status:false,
    message:'',
    loading:false
  };
  const NewPasswordReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartNewPassword':
        item.status = false
        item.error =''
        item.message = '',
        item.loading = true
        break
      case 'SuccessNewPassword':
        item.status = true
        item.error =''
        item.message = action.data?.message,
        item.loading = false
        break
      case 'ErrorNewPassword':
        item.error = action.data
        item.loading = false
        item.status = false
        break;
     case 'CleanNewPassword':
        item.status = false
        item.error =''
        item.message = '',
        item.loading = false
        break
      default:
        break;
    }
    return item;
  };
  export default NewPasswordReducer;
  