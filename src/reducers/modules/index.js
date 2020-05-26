import {combineReducers} from "redux";
import {cellTypeViewerReducer} from './cellTypeViewer'

export default combineReducers({
    cellTypeViewer: cellTypeViewerReducer
});