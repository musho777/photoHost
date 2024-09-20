const initialState = {
    error: '',
    status: false,
    data: [],
    loading: false,
    nextPage: null,
};
const GetCityesReducer = (state = initialState, action) => {
    let item = { ...state };
    switch (action.type) {
        case 'StartGetCiyts':
            item.status = false
            item.error = ''
            item.loading = true
            break
        case 'SuccessGetCitys':
            item.status = true
            item.error = ''
            action.data.data.map((elm, i) => {
                item.data.push(elm)
            })
            if (action.data.current_page == 1) {
                item.data = action.data.data
            }
            item.nextPage = action.data.next_page_url
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
