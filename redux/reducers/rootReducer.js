import { combineReducers } from "redux"
import { UserReducer } from "./user"; 
const rootReducer = combineReducers({
    UserReducer: UserReducer
})

export default rootReducer;