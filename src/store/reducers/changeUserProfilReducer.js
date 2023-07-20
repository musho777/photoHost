const initialState = {
    error: '',
    status: false,
    message: '',
    loading: false,
  };
  const ChangeUserProfilReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartChangeData':
        item.status = false;
        item.error = '';
        item.message = '', 
        item.loading = true;
        break;
      case 'SuccessChangeProfil':
        item.status = true;
        item.error = '';
        item.message = action.data?.message,
        item.loading = false;
        break;
      case 'ErrorChangeProfile':
        item.error = action.data;
        item.loading = false;
        item.status = false;
        break;
      case 'ClearChangeProfile':
        item.error = '';
        item.loading = false;
        item.status = false;
        break;
      default:
        break;
    }
    return item;
  };
  export default ChangeUserProfilReducer;
  