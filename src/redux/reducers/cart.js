const initialState = {
    list: []
}

const cartReducers = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            const newList = action.payload
            return {
                ...state,
                list: newList
            }

        default: return state
    }
}

export default cartReducers