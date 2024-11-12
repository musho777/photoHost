const initialState = {
  error: '',
  status: false,
  loading: true,
  data: [],
  message: '',
  nextPage: '',
};
const GetMyChatRoomReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetMyChatRoom':
      item.status = false;
      item.error = '';
      item.loading = true;
      break;
    case 'SuccessGetMyChatRoom':
      item.status = true;
      item.error = '';
      if (action.data.data.current_page == 1) {
        item.data = action.data.data.data;
      }
      else if (item.nextPage != action.data.data.next_page_url) {
        item.data = [...item.data, ...action.data.data.data];
      }
      item.nextPage = action.data.data.next_page_url;
      item.loading = false;
      break;
    case 'SuccessDelateChat':
      let i = item.data.findIndex((elm) => (elm.receiver_id == action.data) || (elm.sender_id == action.data))
      if (i >= 0) {
        item.data.splice(i, 1);
      }
      break
    case 'ErrorGetMyChatRoom':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      break;
    case 'NewMsgAction':
      item.data.map((elm, i) => {
        if (elm.room_id == action.data.data.room_id) {
          item.data.splice(i, 1);
        }
      });
      item.data.unshift(action.data.data);
      break;
    case 'ClearSinglChatNumber':
      let index = item.data.findIndex((elm) => elm.id == action.id)
      if (index >= 0) {
        item.data[index].message_sum = 0
      }
      break
    default:
      break;
  }
  return item;
};
export default GetMyChatRoomReducer;
