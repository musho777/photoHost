const initialState = {
    error: '',
    status:false,
    message:'',
    loading:false,
    data:{},
    username:'',
    name:'',
    description:'',
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
        item.username = '',
        item.name = '',
        item.description = ''
        break
      case 'SuccessGetUserData':
        item.status = true
        item.error =''
        item.message = action.data?.message,
        item.loading = false
        item.data = action.data
        item.username = action.data.nickname,
        item.name = action.data.name,
        item.description = action.data.description
        break
      case 'ErrorGetUserData':
        item.error = action.data
        item.loading = false
        item.status = false
        item.data = {}
        break;
      case 'changeUserData':
        item.username = action.data.nickname,
        item.name = action.data.name,
        item.description = action.data.description
      default:
        break;
    }
    return item;
  };
  export default GetUserDataReducer;
  