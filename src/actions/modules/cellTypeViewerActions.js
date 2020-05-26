import SascWebApi from "../../apis/SascWeb";
import {modules} from "../../constants/types";


export const getCells = () => async (dispatch) =>{
    const result = await SascWebApi.get('/items/cell?limit=50000');
    dispatch({type: modules.cellTypeViewer.GET_CELLS, payload: result.data.data})
}
