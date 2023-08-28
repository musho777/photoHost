const initialState = {
    deletChatPusher: {},
    deletChatPuserStatus: false,
    deletChatPusherLoading: false,
};
const DeletChatPusherReducer = (state = initialState, action) => {
    let item = { ...state };
    switch (action.type) {
        case "DeleteChatPusherAction":
            item.deletChatPusher = action.data
            break
        case 'ClearDeletChat':
            item.deletChatPusher = {}
            break
        default:
            break;
    }
    return item;
};
export default DeletChatPusherReducer;
