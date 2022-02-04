import { combineReducers } from "redux";
import foodReducers from "./foods";
import userReducers from "./user";
import cartReducers from "./cart";
import commentReducers from "./comment";

const rootReducers = combineReducers({
    foods: foodReducers,
    user: userReducers,
    cart: cartReducers,
    comment: commentReducers
})

export default rootReducers