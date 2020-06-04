import {combineReducers} from "redux";
import cellsReducer from "./cellsReducer";
import geneSuggestionsReducer from "./geneSuggestionsReducer";
import cellsByGeneReducer from "./cellsByGeneReducer";

export const cellTypeViewerReducer = combineReducers({
    cells: cellsReducer,
    cellsByGene: cellsByGeneReducer,
    geneSuggestions: geneSuggestionsReducer
})