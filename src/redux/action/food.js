export const setAllFood = (foods) => {
    return {
        type: "SET_LIST_FOOD",
        payload: foods
    }
}

export const setDetailFood = (id) => {
    return {
        type: "SET_DETAIL_FOOD",
        payload: id
    }
}