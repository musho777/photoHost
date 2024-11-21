const initialState = {
  fullScreen: false,
  indexData: null
};
const FullScreenReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'fullScreenAction':
      console.log(action.value, '----')
      item.fullScreen = action.value;
      item.indexData = action.index
      break;
    default:
      break;
  }
  return item;
};
export default FullScreenReducer;
