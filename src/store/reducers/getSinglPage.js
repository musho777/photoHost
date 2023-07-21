const initialState = {
    error: '',
    status: false,
    message: '',
    loading: false,
    data:{}
  };
  const GetSinglPage = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StarGetSinglUser':
        item.status = false;
        item.error = '';
        item.message = '', 
        item.loading = true;
        break;
      case 'SuccessGetSinglPage':
        item.status = true;
        item.error = '';
        item.message = action.data?.message,
        item.loading = false;
        item.data = action.data.data
        break;
      case 'ErrorGetSinglPage':
        item.error = action.data;
        item.loading = false;
        item.status = false;
        item.data = {}
        break;
      default:
        break;
    }
    return item;
  };
  export default GetSinglPage;
  