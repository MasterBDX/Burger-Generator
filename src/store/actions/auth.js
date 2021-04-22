import * as actionsTypes from './actionTypes';

import axios from 'axios';

const loginStart = ()=>{
    console.log('iam starting')
    return {
        type:actionsTypes.LOGIN_START
    };
}

const loginSuccess = (loginData) =>{
    return {
        type:actionsTypes.LOGIN_SUCCESS,
        loginData:loginData
    }
}

const loginFail = (error)=>{
    return {
        type:actionsTypes.LOGIN_FAIL,
        error:error
    }
    
}

export const login = (email,password)=>{
    return dispatch =>{
        dispatch(loginStart)
        const data  = {
            email:email,
            password:password,
            returnSecureToken:true
         }
        console.log(data)
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPC7rko3GMmlU72t3cTrgXl6SymC2U9GI',
                   data).then(data => {
                        console.log(data)
                        dispatch(loginSuccess)
                    }
                ).catch(err =>{
                    console.log(err)
                    dispatch(loginFail)
                })
    }
}

 