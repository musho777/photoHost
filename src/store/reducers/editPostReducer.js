const initialState = {
    error: '',
    status:false,
    message:'',
    loading:false,
    data:{}
  };
  const EditPostReducer = (state = initialState, action) => {
    let item = {...state};
    switch (action.type) {
      case 'StartEditPost':
        item.status = false
        item.error =''
        item.message = '',
        item.loading = true
        item.data = {}
        break
      case 'SuccessEditPost':
        item.status = true
        item.error =''
        item.message = action.data?.message,
        item.loading = false
        item.data = action.data
        break
      case 'ErrorEditPost':
        item.error = action.data
        item.loading = false
        item.status = false
        break;
      case 'ClearEditPost':
        item.error = ''
        item.loading = false
        item.status = false
        item.data = {}
        break
      default:
        break;
    }
    return item;
  };
  export default EditPostReducer;
  