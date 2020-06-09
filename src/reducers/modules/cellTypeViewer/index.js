import {combineReducers} from "redux";
import cellsReducer from "./cellsReducer";
import geneSuggestionsReducer from "./geneSuggestionsReducer";
import cellsByGeneReducer from "./cellsByGeneReducer";
import activeGeneReducer from "./activeGeneReducer";

export const cellTypeViewerReducer = combineReducers({
    cells: cellsReducer,
    cellsByGene: cellsByGeneReducer,
    geneSuggestions: geneSuggestionsReducer,
    activeGene: activeGeneReducer
})