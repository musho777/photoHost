const initialState = {
    count: '',
};
const MsgCountReducer = (state = initialState, action) => {
    let item = { ...state };
    switch (action.type) {
        case 'StartRegister':
            item.count = action.data
            break;
        default:
            break;
    }
    return item;
};
export default MsgCountReducer;
