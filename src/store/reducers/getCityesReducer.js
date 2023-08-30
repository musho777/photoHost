const initialState = {
    error: '',
    status: false,
    data: [],
    loading: false
};
const GetCityesReducer = (state = initialState, action) => {
    let item = { ...state };
    switch (action.type) {
        case 'StartGetCiyts':
            item.status = false
            item.error = ''
            item.data = []
            item.loading = true
            break
        case 'SuccessGetCitys':
            item.status = true
            item.error = ''
            item.data = action.data
            item.loading = false
            break
        case 'ErrorGetCitys':
            item.error = action.data
            item.loading = false
            item.status = false
            item.data = []
            break;
        default:
            break;
    }
    return item;
};
export default GetCityesReducer;
