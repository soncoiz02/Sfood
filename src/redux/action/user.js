export const setUserInfor = (infor) => {
    return {
        type: "SET_USER_INFOR",
        payload: infor
    }
}

export const setIsSigned = (type) => {
    return {
        type: "SET_SIGNED",
        payload: type
    }
}