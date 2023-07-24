const initialState = {
    error: '',
    status: false,
    message: '',
    loading: false,
    data:{}
  };
  const GetSinglePageChatReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartGetSinglePageChat':
        item.status = false;
        item.error = '';
        item.message = '', 
        item.loading = true;
        item.data = {}
        console.log(9998)
        break;
      case 'SuccessGetSinglePageChat':
        console.log(action.data.receiver_user,9999)
        item.status = true;
        item.error = '';
        item.message = action.data?.message,
        item.loading = false;
        item.data = action.data.receiver_user
        break;
      case 'ErrorGetSinglePageChat':
        item.error = action.data;
        item.loading = false;
        item.status = false;
        item.data = {}
        break;
      default:
        break;
    }
    return item;
  };
  export default GetSinglePageChatReducer;
  