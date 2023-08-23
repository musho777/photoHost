const initialState = {
  error: '',
  status: false,
  message: '',
  loading: false,
  data: {},
  followerCount: null,
  followersCount: null,
  postCount: null
};
const GetSinglPage = (state = initialState, action) => {
  let item = { ...state };
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
      item.followerCount = action.data.follower_count
      item.followersCount = action.data.followers_count
      item.postCount = action.data.post_count
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
    case 'AddDeletFollow':
      if (item.data.follow_status_sender.length) {
        item.data.follow_status_sender = []
      }
      else {
        item.data.follow_status_sender = [{}]
      }
      break
    default:
      break;
  }
  return item;
};
export default GetSinglPage;
