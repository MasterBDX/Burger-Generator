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

const logout = ()=>{
    return {
        type:actionsTypes.AUTH_LOGOUT
    }
}

const checkAithTimeout = (expirationTime) =>{
    console.log('iam here')
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout()) 
        }, expirationTime * 1000);
    }
}

export const auth = (email,password,isSignUp)=>{
    return dispatch =>{
        dispatch(authStart())
        const data  = {
            email:email,
            password:password,
            returnSecureToken:true
         }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPC7rko3GMmlU72t3cTrgXl6SymC2U9GI';
        
        if (isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPC7rko3GMmlU72t3cTrgXl6SymC2U9GI'
        }
        axios.post(url,
                   data).then(res => {
                    console.log(res.data)    
                        dispatch(authSuccess(res.data.idToken,res.data.localId))
                        if (!isSignUp){
                            dispatch(checkAithTimeout(res.data.expiresIn))
                        }
                    }
                ).catch(err =>{
                    dispatch(authFail(err.response.data.error))
                })
    }
}

 