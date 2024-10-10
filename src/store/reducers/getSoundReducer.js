const initialState = {
  status: false,
  loading: true,
  data: [],
};
const GetSoundReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetSound':
      item.status = false
      item.loading = true
      item.data = []
      break
    case 'SuccessGetSound':
      item.status = true
      item.loading = false
      item.data = action.data
      break
    case 'ErroGetSound':
      item.status = false
      item.loading = false
      item.data = []
      break;
    default:
      break;
  }
  return item;
};
export default GetSoundReducer;
