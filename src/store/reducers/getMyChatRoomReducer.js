const initialState = {
    error: '',
    status: false,
    loading: false,
    data:[],
    message:'',
    nextPage: '',
  };
  const GetMyChatRoomReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartGetMyChatRoom':
        item.status = false;
        item.error = '';
        item.loading = true;
        break;
      case 'SuccessGetMyChatRoom':
        item.status = true;
        item.error = '';
        if( item.nextPage !=action.data.data.next_page_url ){
          item.data = [...item.data, ...action.data.data.data];
        }
        item.nextPage = action.data.data.next_page_url
        item.loading = false;
        break;
      case 'ErrorGetMyChatRoom':
        item.error = action.data;
        item.loading = false;
        item.status = false;
        // item.data = {}
        break;
      case 'NewMsgAction':
        item.data.map((elm,i)=>{
          if(elm.room_id == action.data.data.room_id){
            item.data.splice(i,1)
          }
        })
          item.data.unshift(action.data.data)
        break
      default:
        break;
    }
    return item;
  };
  export default GetMyChatRoomReducer;
  