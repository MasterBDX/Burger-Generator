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

export const burgerPurchase = (orderData) =>{
    return (dispatch) =>{
        dispatch(startPurchaseBurger())
        axios.post('/orders.json', orderData)
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
