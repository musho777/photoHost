const initialState = {
  full: false,
};
const FullScreenReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'FullScreen':
      item.full = action.data;
      break;
    default:
      break;
  }
  return item;
};
export default FullScreenReducer;
