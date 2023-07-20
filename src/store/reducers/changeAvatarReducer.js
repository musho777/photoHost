const initialState = {
    error: '',
    status: false,
    message: '',
    loading: false,
  };
  const ChangeAvatarReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartChangeAvatar':
        item.status = false;
        item.error = '';
        item.message = '', 
        item.loading = true;
        break;
      case 'SuccessChangeAvatar':
        item.status = true;
        item.error = '';
        item.message = action.data?.message,
        item.loading = false;
        break;
      case 'ErrorChangeAvatar':
        item.error = action.data;
        item.loading = false;
        item.status = false;
        break;
      case 'ClearChangeAvatar':
        item.error = '';
        item.loading = false;
        item.status = false;
        break;
      default:
        break;
    }
    return item;
  };
  export default ChangeAvatarReducer;
  