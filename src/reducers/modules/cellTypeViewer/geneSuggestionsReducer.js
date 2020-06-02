import {modules} from '../../../constants/types'

export default (state=[], action) => {
    switch (action.type) {
        case modules.cellTypeViewer.GET_GENE_SUGGESTION:
            return action.payload.map( (item) => {
                return {
                    title: item.symbol,
                    description: `Nothing here yet `,
                    id: item.id
                }
            })
        default:
            return state;
    }
}