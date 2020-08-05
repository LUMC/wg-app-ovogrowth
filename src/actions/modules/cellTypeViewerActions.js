import SascWebApi from "../../apis/SascWeb";
import {modules} from "../../constants/types";


export const getCells = () => async (dispatch, getState) =>{
    dispatch({type: modules.cellTypeViewer.CLEAR_CELLS_BY_GENE})
    dispatch({type: modules.cellTypeViewer.CLEAR_CELLS})
    const result = await SascWebApi.get(`/items/cell?limit=50000&
    filter[dataset]=${getState().modules.cellTypeViewer.activeDataset}`);
    dispatch({type: modules.cellTypeViewer.GET_CELLS, payload: result.data.data})
}

export const getGeneSuggestions = (searchTerm) => async (dispatch) =>{
    const result = await SascWebApi.get(`/items/gene?limit=5&filter[symbol][logical]=or&
    filter[symbol][rlike]=${searchTerm}%&`);
    dispatch({type: modules.cellTypeViewer.GET_GENE_SUGGESTION, payload: result.data.data})
};

export const getCellsByGene = (geneId, geneName) => async (dispatch, getState) =>{
    dispatch({type: modules.cellTypeViewer.CLEAR_CELLS_BY_GENE});
    const dataset = getState().modules.cellTypeViewer.activeDataset;
    const result = await SascWebApi.post('custom/data/cell-GE', {geneId:geneId, dataset});
    dispatch({type: modules.cellTypeViewer.GET_CELLS_BY_GENE, payload: {data:result.data, geneId, geneName}})
}
export const resetCellByGene = () =>{
    return {type: modules.cellTypeViewer.CLEAR_CELLS_BY_GENE}
}

export const setActiveDataset = (datasetId) => {
    return {type:modules.cellTypeViewer.SET_ACTIVE_DATASET, payload:datasetId}
}