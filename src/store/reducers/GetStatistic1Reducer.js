const initialState = {
  status: false,
  loading: true,
  data: {},
};
const GetStatistic1Reducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetstatistic1':
      item.status = false
      item.error = ''
      item.message = '',
        item.loading = true
      item.data = {}
      break
    case 'SuccessGetstatistic1':
      item.status = true
      item.error = ''
      item.message = action.data?.message
      item.loading = false
      item.data = action.data
      break
    case 'ErrorGetstatistic1':
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
export default GetStatistic1Reducer;
