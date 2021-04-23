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

export const auth = (email,password,isSignUp)=>{
    console.log(isSignUp)
    return dispatch =>{
        dispatch(authStart)
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
                        dispatch(authSuccess(res.data.idToken,res.data.localId))
                    }
                ).catch(err =>{
                    console.log(err)
                    dispatch(authFail)
                })
    }
}

 