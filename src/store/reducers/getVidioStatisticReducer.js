const initialState = {
  status: false,
  loading: true,
  data: {},
  error: '',
};
const GetVidioStatisticReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartGetVidioStatistic':
      item.status = false
      item.error = ''
      item.loading = true
      item.data = {}
      break
    case 'SuccessGetVidioStatistic':
      item.status = true
      item.error = ''
      item.loading = false
      item.data = action.data
      break
    case 'ErrorGetVidioStatistic':
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
export default GetVidioStatisticReducer;
