const initialState = {
  error: '',
  status: false,
  loading: true,
  data: {},
  message: [],
  nextPage: '',
  blackList: null,
  delateChatStatus: false,
  dleateChatLoading: false,
  resiverUser: {}
};
const GetSinglePageChatReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetSinglePageChat':
      item.status = false;
      item.error = '';
      // item.message = '', 
      item.loading = true;
      // item.data = {}
      break;
    case 'ClearChat':
      item.message = []
      item.nextPage = ''
      break
    case 'SuccessGetSinglePageChat':
      item.status = true;
      item.error = '';
      item.blackList = action.data.black_list_status
      item.resiverUser = action.data.receiver_user
      if (action.data.data.data?.length) {
        if (item.nextPage != action.data?.data?.next_page_url) {
          item.message = [...item.message, ...action.data?.data?.data];
        }
        item.nextPage = action.data?.data?.next_page_url
      }
      item.loading = false;
      item.data = action?.data?.receiver_user
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
    case 'AddMyMSgAction':
      item.message.unshift(action.data)
      break
    // case 'SuccessNewMessageAction':
    //   item.message.unshift(action.data)
    //   break
    case 'StartDelateChat':
      item.delateChatStatus = false
      item.dleateChatLoading = true
      break
    case 'SuccessDelateChat':
      item.delateChatStatus = true
      item.dleateChatLoading = false
      break
    case 'ErrorDelateChat':
      item.delateChatStatus = false,
        item.dleateChatLoading = false
      break
    case 'ClearDeleteChat':
      item.delateChatStatus = false,
        item.dleateChatLoading = false
      break
    default:
      break;
  }
  return item;
};
export default GetSinglePageChatReducer;
