const initialState = {
  status: false,
  loading: true,
  data: [],
};
const GetStatistic2Reducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetStatisitc2':
      item.status = false
      item.error = ''
      item.loading = true
      item.data = {}
      break
    case 'SuccessGetStatisitc2':
      item.status = true
      item.error = ''
      item.loading = false
      item.data = action.data
      break
    case 'ErrorGetStatisitc2':
      item.error = action.data
      item.loading = false
      item.status = false
      item.data = {}
      break;
    default:
      break;
  }
  return item;
};
export default GetStatistic2Reducer;
