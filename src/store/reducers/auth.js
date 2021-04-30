import * as actionsTypes from '../actions/actionTypes';
import updateObject from '../utility';


const initialState = {
    loading:false,
    idToken:null,
    userID:null,
    error:null,
    redirectPath:'/'
}

const authStart = (state,action) =>{
    return updateObject(state,{
        loading:true
    })
}

const authSuccess = (state,action) =>{
    return updateObject(state,{
        idToken:action.idToken,
        userID:action.userID,
        loading:false
    })
}

const authFail = (state,action) =>{
    return updateObject(state,{
        loading:false,
        error:action.error
    })    
}

const authLogout = (state,action) =>{
    return updateObject(state,{
        loading:false,
        idToken:null,
        userID:null
    })    
}

const authredirectPath = (state,action) =>{
    return updateObject(state,{
        redirectPath:action.path
    })    
}


const reducer = (state=initialState,action) =>{
    switch (action.type){
        case actionsTypes.AUTH_START:return authStart(state,action);
        case actionsTypes.AUTH_SUCCESS:return authSuccess(state,action);
        case actionsTypes.AUTH_FAIL:return authFail(state,action);
        case actionsTypes.AUTH_LOGOUT:return authLogout(state,action);
        case actionsTypes.AUTH_REDIRECT_PATH:return authredirectPath(state,action);
        default:return state
    }
}



export default reducer;
