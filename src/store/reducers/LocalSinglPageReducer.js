const initialState = {
  data: {}
};
const LocalSinglPageReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'LocalSinglImage':
      item.data = action.data
      break
    case 'AddCommentLocal':
      item.data.comment_count = +item.data.comment_count + 1
      break

    default:
      break;
  }
  return item;
};
export default LocalSinglPageReducer;
