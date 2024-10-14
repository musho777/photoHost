const initialState = {
  show: true
};
const showTabNavigatiorReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case "ShowTabNavigation":
      item.show = true
      break
    case "hidenTabNavigation":
      item.show = false
      break
    default:
      break;
  }
  return item;
};
export default showTabNavigatiorReducer;
