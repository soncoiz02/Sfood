const initialState = {
    list: []
}

const commentReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            const newList = action.payload
            return {
                ...state,
                list: newList
            }

        default: return state
    }
}

export default commentReducers