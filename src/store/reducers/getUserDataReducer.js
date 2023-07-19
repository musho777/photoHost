const initialState = {
    error: '',
    status:false,
    message:'',
    loading:false,
    data:{}
  };
  const GetUserDataReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartGetUserData':
        item.status = false
        item.error =''
        item.message = '',
        item.loading = true
        item.data = {}

        break
      case 'SuccessGetUserData':
        item.status = true
        item.error =''
        item.message = action.data?.message,
        item.loading = false
        item.data = action.data
        break
      case 'ErrorGetUserData':
        item.error = action.data
        item.loading = false
        item.status = false
        item.data = {}
        break;
      default:
        break;
    }
    return item;
  };
  export default GetUserDataReducer;
  