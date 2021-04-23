import * as actionsTypes from '../actions/actionTypes';
import updateObject from '../utility';


const initialState = {
    loading:false,
    idToken:null,
    localId:null
}

const authStart = (state,action) =>{
    return updateObject(state,{
        loading:true
    })
}

const authSuccess = (state,action) =>{
    return updateObject(state,{
        idToken:action.idToken,
        localId:action.localId,
        loading:false
    })
}

const authFail = (state,action) =>{
    return updateObject(state,{
        loading:false,
        error:action.error
    })    
}


const reducer = (state=initialState,action) =>{
    switch (action.type){
        case actionsTypes.AUTH_START:return authStart(state,action)
        case actionsTypes.AUTH_SUCCESS:return authSuccess(state,action)
        case actionsTypes.AUTH_FAIL:return authFail(state,action)
        default:return state
    }
}



export default reducer;
