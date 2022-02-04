const initialState = {
    infor: {},
    isSigned: false
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_INFOR":
            const newInfor = action.payload
            return {
                ...state,
                infor: newInfor
            }
        case "SET_SIGNED":
            const isSigned = action.payload
            return {
                ...state,
                isSigned: isSigned
            }
        default: return state
    }
}

export default userReducers