import SascWebApi from "../../apis/SascWeb";
import {modules} from "../../constants/types";


export const getCells = () => async (dispatch) =>{
    const result = await SascWebApi.get('/items/cell?limit=50000');
    dispatch({type: modules.cellTypeViewer.GET_CELLS, payload: result.data.data})
}

export const getGeneSuggestions = (searchTerm) => async (dispatch) =>{
    const result = await SascWebApi.get(`/items/gene?limit=5&filter[symbol][logical]=or&
    filter[symbol][rlike]=${searchTerm}%&`);
    dispatch({type: modules.cellTypeViewer.GET_GENE_SUGGESTION, payload: result.data.data})
};

export const getCellsByGene = (geneId) => async (dispatch) =>{
    dispatch({type: modules.cellTypeViewer.CLEAR_CELLS_BY_GENE})
    const result = await SascWebApi.post('custom/data/cell-GE', {geneId:geneId})
    dispatch({type: modules.cellTypeViewer.GET_CELLS_BY_GENE, payload: result.data})
}
export const resetCellByGene = () =>{
    return {type: modules.cellTypeViewer.CLEAR_CELLS_BY_GENE}
}