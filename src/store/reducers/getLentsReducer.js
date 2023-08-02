const initialState = {
  error: '',
  status: false,
  loading: false,
  data: [],
  message: '',
  nextPage: '',
};
const GetLentsReducer = (state = initialState, action) => {
  let item = {...state};
  switch (action.type) {
    case 'StartGetLents':
      item.status = false;
      item.error = '';
      item.loading = true;
      break;
    case 'SuccessGetLents':
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
    case 'ErrorGetLents':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      // item.data = {}
      break;
    // case 'NewMsgAction':
    //   item.data.map((elm, i) => {
    //     if (elm.room_id == action.data.data.room_id) {
    //       item.data.splice(i, 1);
    //     }
    //   });
    //   item.data.unshift(action.data.data);
    //   break;
    default:
      break;
  }
  return item;
};
export default GetLentsReducer;
