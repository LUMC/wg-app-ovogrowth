import {combineReducers} from "redux";
import cellsReducer from "./cellsReducer";

export const cellTypeViewerReducer = combineReducers({
    cells: cellsReducer
})