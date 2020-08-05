import {modules} from '../../../constants/types'

export default (state='', action) => {
    switch (action.type) {
        case modules.cellTypeViewer.SET_ACTIVE_DATASET:
            return action.payload;
        default:
            return state;
    }
}