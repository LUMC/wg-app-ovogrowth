import {modules} from '../../../constants/types'

export default (state={}, action) => {
    switch (action.type) {
        case modules.cellTypeViewer.GET_GENE_SUGGESTION:
            return {

            }
        default:
            return state;
    }
}