import * as actionsTypes from './actionTypes';

import axios from 'axios';

const authStart = ()=>{
    return {
        type:actionsTypes.AUTH_START
    };
}

const authSuccess = (idToken,localId) =>{
    return {
        type:actionsTypes.AUTH_SUCCESS,
        idToken:idToken,
        localId:localId,
        
    }
}

const authFail = (error)=>{
    return {
        type:actionsTypes.AUTH_FAIL,
        error:error
    }
    
}

export const logout = ()=>{
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');    
    localStorage.removeItem('expiresIn');
    return {
        type:actionsTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout()) 
        }, expirationTime * 1000);
    }
}

export const auth = (email,password,isSignUp)=>{
    return dispatch =>{
        dispatch(authStart());

        const data  = {
            email:email,
            password:password,
            returnSecureToken:true
         }
        
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPC7rko3GMmlU72t3cTrgXl6SymC2U9GI';
        
        if (isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPC7rko3GMmlU72t3cTrgXl6SymC2U9GI'
        }

        axios.post(url, data).then(res => {    
                const data = res.data
                dispatch(authSuccess(data.idToken,data.localId));

                localStorage.setItem('idToken',data.idToken);
                localStorage.setItem('localId',data.localId);
                const expirationTime = new Date(new Date().getTime() + data.expiresIn * 1000);            
                localStorage.setItem('expiresIn',expirationTime);
            
                if (!isSignUp){
                    dispatch(checkAuthTimeout(data.expiresIn))
                }
            }
                ).catch(err =>{
                    dispatch(authFail(err.response.data.error))
                })
    }
}

export const getAuthRedirectPath = (path)=>{
    return {
        type:actionsTypes.AUTH_REDIRECT_PATH,
        path:path
    }
} 
 
export const checkAuthStatus = ()=>{
    const idToken = localStorage.getItem('idToken');
    const localId = localStorage.getItem('localId');    
    const expiresIn = localStorage.getItem('expiresIn');
    return dispatch =>{
        if (!idToken){
            dispatch(logout());
        }else{
            if (new Date(expiresIn) > new Date()){
                dispatch(authSuccess(idToken,localId));
                const expirationTime = new Date(expiresIn) - new Date();
                dispatch(checkAuthTimeout(expirationTime / 1000));
            }else{
                dispatch(logout());
            }
        }
    }
    
    
}