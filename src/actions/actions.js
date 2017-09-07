import EVT from '../services/Events';


const reducerActions = {
    init: (data) => {
        return (dispatch) => {
            dispatch(init(data));
        }
    },
    onNewCall(data){
        return (dispatch) => {
            dispatch({ 
            	type: EVT.NEXTCALL, 
            	payload: data
            });
        };
    }
};

let init = (initData) => {
    return {
        type: EVT.INIT,
        payload: initData
    }
};


export default reducerActions;
