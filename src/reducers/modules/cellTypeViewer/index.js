import {combineReducers} from "redux";
import cellsReducer from "./cellsReducer";
import geneSuggestionsReducer from "./geneSuggestionsReducer";

export const cellTypeViewerReducer = combineReducers({
    cells: cellsReducer,
    geneSuggestions: geneSuggestionsReducer
})