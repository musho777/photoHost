const initialState = {
  fullScreen: false,
};
const FullScreenReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'fullScreenAction':
      console.log(action.value, '----')
      item.fullScreen = action.value;
      break;
    default:
      break;
  }
  return item;
};
export default FullScreenReducer;
