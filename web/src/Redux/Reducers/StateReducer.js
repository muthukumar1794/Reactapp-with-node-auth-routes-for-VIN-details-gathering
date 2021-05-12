const initialState = {
    userdata: null,
    token: null,
    PastTransactions: [],
    projectName: null,
    TokenError: null
}

const stepHandler = (state = initialState, action) => {

    switch (action.type) {
        case "userdata_Action":
            return { ...state, ...{ userdata: action.data } }
        case "token_Action":
            return { ...state, ...{ token: action.data } }
        case "PastTransactions_Action":
            return { ...state, ...{ token: action.data } }
        case "projectName_Action":
            return { ...state, ...{ projectName: action.data } }
        case "TokenError_Action":
            return { ...state, ...{ TokenError: action.data } }
        default:
            return state;
    }
};

export default stepHandler