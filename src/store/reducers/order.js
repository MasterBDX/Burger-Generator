import * as actionTypes from '../actions/actionTypes';


const initialState = {
    orders :  [],
    loading:false,
    purchased:false
}

const reducer = (state=initialState, action) =>{
    const newOrder = {id:action.orderId,...action.orderData}
    switch (action.type){
        case actionTypes.PURCHASE_BURGER_INIT:
            console.log('im in')
            return {
                ...state,
                purchased:false
            };

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                orders : state.orders.concat(newOrder),
                loading:false,
                purchased:true   
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
                return {
                    ...state,
                    loading:false
                }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading:true
            }
        case actionTypes.ORDERS_FETCH_START:
            return {
                ...state,
                loading:true
            }
        default :
            return state 
    }
}


export default reducer ;