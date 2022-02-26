const initialState = {
    list: []
}

const cartReducers = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART_DATA":
            const newList = action.payload
            return {
                ...state,
                list: newList
            }

        default: return state
    }
}

export default cartReducers