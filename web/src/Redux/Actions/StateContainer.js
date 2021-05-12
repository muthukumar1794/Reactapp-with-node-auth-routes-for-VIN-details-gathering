export const userdataAction = (value) => {
    return {
        type: "userdata_Action",
        data: value,
    };
};
export const tokenAction = (value) => {
    return {
        type: "token_Action",
        data: value,
    };
};
export const PastTransactionsAction = (value) => {
    return {
        type: "PastTransactions_Action",
        data: value,
    };
};
export const projectNameAction = (value) => {
    return {
        type: "projectName_Action",
        data: value,
    };
};
export const TokenErrorAction = (value) => {
    return {
        type: "TokenError_Action",
        data: value,
    };
};