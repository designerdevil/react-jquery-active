import EVT from '../services/Events';
import services from '../config/config';


let initialState = {}
$(services).each(function(i, v){
	initialState[v.servicename] = {}
});

export default (state = initialState, action) => {
    switch (action.type) {
    	case EVT.INIT:
    		return Object.assign({}, state)
            break;
    	case EVT.NEXTCALL:
    		return Object.assign({}, state, action.payload)
            break;
        default:
            return state;
    }
};
