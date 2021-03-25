import * as actionsTypes from './actionTypes';

export  const resetIngredients = () =>{
    return {type:actionsTypes.RESET_INGREDIENTS}
}

const purchaseBurgerSuccess = (id,orderData) =>{
    return {
        type:actionsTypes.PURCHASE_BURGER_SUCCESS,
        id:id,
        orderData:orderData
    }
}

const purchaseBurgerFail = (error) =>{
    return {
        type:actionsTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

const startBurgerPurchase = (orderData) =>{
    return (dispatch) =>{
        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data,orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}



