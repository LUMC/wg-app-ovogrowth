import {modules} from '../../../constants/types'

export default (state={}, action) => {
    switch (action.type) {
        case modules.cellTypeViewer.GET_CELLS_BY_GENE:
            return action.payload.data;
        case modules.cellTypeViewer.CLEAR_CELLS_BY_GENE:
            return {}
        default:
            return state;
    }
}