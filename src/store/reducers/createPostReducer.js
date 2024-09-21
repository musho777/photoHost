const initialState = {
  error: '',
  status: false,
  message: '',
  loading: false,
  localImg: ''
};
const CreatePostReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'StartCreatePost':
      item.status = false
      item.error = ''
      item.message = ''
      item.loading = true
      break
    case 'SuccessCreatePost':
      item.status = true
      item.error = ''
      item.message = action.data?.message
      item.loading = false
      break
    case 'CreatePostLocal':
      item.localImg = action.form
      break
    case 'ErrorCreatePost':
      item.error = 'error'
      item.loading = false
      item.status = false
      break;
    case 'ClearCreatPost':
      item.error = ''
      item.loading = false
      item.status = false
      break
    default:
      break;
  }
  return item;
};
export default CreatePostReducer;
