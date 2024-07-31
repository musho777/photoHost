const initialState = {
  lang: 'ru'
};

const MainReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'ChnageLanguage':
      item.lang = action.lang
      break
    default:
      break;
  }
  return item;
};
export default MainReducer;
