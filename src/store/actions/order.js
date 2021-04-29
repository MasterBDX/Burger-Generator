import * as actionsTypes from './actionTypes';
import axios from '../../axios/axios-orders';

export  const resetIngredients = () => {
    return {type:actionsTypes.RESET_INGREDIENTS}
}

const purchaseBurgerSuccess = (id,orderData) =>{
    return {
        type:actionsTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

const purchaseBurgerFail = (error) =>{
    return {
        type:actionsTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const startPurchaseBurger = () =>{
    return {
        type:actionsTypes.PURCHASE_BURGER_START
    }
}

export const burgerPurchase = (orderData,token) =>{
    
    return (dispatch) =>{
        dispatch(startPurchaseBurger());

        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })

        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const initPurchaseBurger = () =>{
    return {
        type:actionsTypes.PURCHASE_BURGER_INIT
    }
}


export const ordersFetchStart = ()=>{
    return {
        type:actionsTypes.ORDERS_FETCH_START
    }
}


export const ordersFetchSuccess = (orders)=>{
    return {
        type:actionsTypes.ORDERS_FETCH_SUCCESS,
        orders:orders
    }
}


export const ordersFetchFail = (error)=>{
    return {
        type:actionsTypes.ORDERS_FETCH_FAIL,
        error:error
    }
}


export const ordersFetch = (token)=>{
    
    return dispatch =>{
        dispatch(ordersFetchStart());
        axios.get('/orders.json',{ params: { auth:token }}).then((response)=>{
            let orders = []
            const data = response.data
            for (let key in response.data){
                orders.push({...data[key],
                            id:key}
                             )
              
            }
            
            dispatch(ordersFetchSuccess(orders))

        }).catch((error)=>{
            dispatch(ordersFetchFail(error))
        })
    }
}
