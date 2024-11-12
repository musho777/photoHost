
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
  resiverUser: {},
  id: '',
  myid: ''
};
const GetSinglePageChatReducer = (state = initialState, action) => {

  let item = { ...state };
  switch (action.type) {
    case 'SinglChatPageId':
      item.id = action.id
      item.myid = action.myid
      break
    case 'StartGetSinglePageChat':
      item.status = false;
      item.error = '';
      item.loading = true;
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
      break;
    case 'ErrorGetSinglePageChat':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    case 'AddMsgAction':
      if (item.myid == action.data.receiver_id && item.id == action.data.sender_id) {
        item.message.unshift(action.data)
      }
      if (item.myid == action.data.sender_id && item.id == action.data.receiver_id) {
        item.message.unshift(action.data)
      }
      break
    case 'AddMyMSgAction':
      item.message.push(action.data)
      break
    case 'StartDelateChat':
      item.delateChatStatus = false
      item.dleateChatLoading = true
      break
    case 'ErrorDelateChat':
      item.delateChatStatus = false
      item.dleateChatLoading = false
      break
    case 'ClearDeleteChat':
      item.delateChatStatus = false
      item.dleateChatLoading = false
      break
    case "DelateMessageLocal":
      let indexForDelate = item.message.findIndex((elm) => elm.id == action.data)
      if (indexForDelate >= 0) {
        item.message.splice(indexForDelate, 1)
      }
      break
    default:
      break;
  }
  return item;
};
export default GetSinglePageChatReducer;
