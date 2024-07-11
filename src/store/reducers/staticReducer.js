const initialState = {
  token: ''
};
const StaticReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'setToken':
      item.token = action.token
      break
    case 'SuccessLogout':
      item.token = ''
      break
    default:
      break;
  }
  return item;
};
export default StaticReducer;
