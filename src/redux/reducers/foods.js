const initialState = {
    list: [],
    detail: {}
}

const foodReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LIST_FOOD":
            const newList = action.payload
            return {
                ...state,
                list: newList
            }
        case "SET_DETAIL_FOOD":
            const id = action.payload
            const listFood = state.list
            const detail = listFood.forEach(e => {
                if (e.id === id) {
                    return e
                }
            })
            return {
                ...state,
                detail: detail
            }
        default: return state
    }
}


export default foodReducers