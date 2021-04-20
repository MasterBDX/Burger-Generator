import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';


const initialState = {
    orders :  [],
    loading:false,
    purchased:false
}

const initPurchase = (state,action)=>{
    return updateObject(state,{purchased:false });
}

const purchaseSuccess = (state,action)=>{
    const newOrder = {id:action.orderId,...action.orderData}
    const successUpdatedProps = {
        orders : state.orders.concat(newOrder),
        loading:false,
        purchased:true   
    }
    const successUpdatedObj = updateObject(state,successUpdatedProps)
    return successUpdatedObj
}

const purchaseFail = (state,action)=>{
    return updateObject(state,{ loading:false })
}

const purchaseStart = (state,action)=>{
    return updateObject(state,{ loading:true })
}

const ordersFetchStart = (state,action) =>{
    return updateObject(state,{ loading:true })
}

const ordersFetchSuccess = (state,action)=>{
    const fetchUpdatedProps = {
        orders:action.orders,
        loading:false
    }
    const fetchUpdatedObj = updateObject(state,fetchUpdatedProps)
    return fetchUpdatedObj
}

const ordersFetchFial = (state,action)=>{
    return updateObject(state,{ loading:false })
}
const reducer = (state=initialState, action) =>{
    switch (action.type){
        case actionTypes.PURCHASE_BURGER_INIT: return initPurchase(state,action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state,action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state,action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state,action);
        case actionTypes.ORDERS_FETCH_START: return ordersFetchStart(state,action);
        case actionTypes.ORDERS_FETCH_SUCCESS:return ordersFetchSuccess(state,action);
        case actionTypes.ORDERS_FETCH_FAIL: return ordersFetchFial(state,action);     
        default : return state }
}


export default reducer ;