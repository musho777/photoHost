const initialState = {
  error: '',
  status: false,
  loading: false,
  data: [],
  message: '',
  nextPage: '',
  addCommentLoading: false,
};
const GetPostCommentsReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetPostComment':
      item.status = false;
      item.error = '';
      item.loading = true;
      break;
    case 'SuccessGetPostComment':
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
    case 'ErrorGetPostComment':
      item.error = action.data;
      item.loading = false;
      item.status = false;
      // item.data = {}
      break;

    case 'ClearSinglpAgeComment':
      item.data = []
      break


    case 'StartAddComment':
      item.addCommentLoading = true
      break
    case 'ErrorAddComment':
      item.addCommentLoading = false
      break
    case 'AddCommentInPost':
      if (!action.data.parent_id) {
        item.data.unshift(action.data)
      }
      else {
        let index = item.data.findIndex((elm) => elm.id == action.data.parent_id)
        if (index >= 0) {
          item.data[index].replay.unshift(action.data1)
          item.data[index].replay_count += 1
        }
      }
      item.addCommentLoading = false
      break


    case 'DelateCommentLocal':
      if (!action.data.parent_id) {
        let index = item.data.findIndex((elm) => elm.id == action.data.comment_id)
        if (index >= 0) {
          item.data.splice(index, 1)
        }
      }
      else {
        let index = item.data.findIndex((elm) => elm.id == action.data.parent_id)
        if (index >= 0) {
          let sub_comment = item.data[index]
          let sub_index = sub_comment.replay.findIndex((elm) => elm.id == action.data.comment_id)
          if (sub_index >= 0) {
            item.data[index].replay.splice(sub_index, 1)
            item.data[index].replay_count -= 1

          }
        }
      }
      break
    default:
      break;
  }
  return item;
};
export default GetPostCommentsReducer;
