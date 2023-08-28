const initialState = {
    addBlackListPusher: {},
};
const AddBlackListPussherReducer = (state = initialState, action) => {
    let item = { ...state };
    switch (action.type) {
        case "AddBlackListPusherAction":
            item.addBlackListPusher = action.data
            break
        default:
            break;
    }
    return item;
};
export default AddBlackListPussherReducer;
