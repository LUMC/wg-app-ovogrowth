import {modules} from '../../../constants/types'

export default (state=[], action) => {
    switch (action.type) {
        case modules.cellTypeViewer.GET_CELLS:
            return action.payload;
        default:
            return state;
    }
}