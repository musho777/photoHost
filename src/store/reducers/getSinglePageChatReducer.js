const initialState = {
    error: '',
    status: false,
    loading: false,
    data:{},
    message:[],
    nextPage: '',
  };
  const GetSinglePageChatReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartGetSinglePageChat':
        item.status = false;
        item.error = '';
        // item.message = '', 
        item.loading = true;
        // item.data = {}
        break;
      case 'SuccessGetSinglePageChat':
        item.status = true;
        item.error = '';
        if( item.nextPage !=action.data.data.next_page_url ){
          item.message = [...item.message, ...action.data.data.data.reverse()];
        }
        item.nextPage = action.data.data.next_page_url
        item.loading = false;
        item.data = action.data.receiver_user
        break;
      case 'ErrorGetSinglePageChat':
        item.error = action.data;
        item.loading = false;
        item.status = false;
        // item.data = {}
        break;
      case 'AddMsgAction':
        item.message.unshift(action.data)
        break
      default:
        break;
    }
    return item;
  };
  export default GetSinglePageChatReducer;
  