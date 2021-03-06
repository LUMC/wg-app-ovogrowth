import {modules} from '../../../constants/types'

export default (state=[], action) => {
    switch (action.type) {
        case modules.cellTypeViewer.GET_CELLS:
            return action.payload;
        case modules.cellTypeViewer.CLEAR_CELLS:
            return  [];
        default:
            return state;
    }
}