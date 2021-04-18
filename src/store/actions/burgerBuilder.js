import * as actionsTypes from './actionTypes';

import axios from '../../axios/axios-orders';

export const addIngredient = (ingName) => {
    return {
        type:actionsTypes.ADD_INGREDIENT,
        ingName:ingName
      }
}

export const removeIngredient = (ingName) => {
    return {
        type:actionsTypes.REMOVE_INGREDIENT,
        ingName:ingName
    }
}

const setIngredients = (ingredients)=>{
        
        return {
            type:actionsTypes.SET_INGREDIENTS,
            ingredients:ingredients
        }
}

const fetchIngredientsFailed = () =>{
    return {
        type:actionsTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = ()=>{
        return (dispatch) =>{
            axios.get('/ingredients.json').then(response=>{
                dispatch(setIngredients(response.data))
            }).catch(error=>{
                dispatch(fetchIngredientsFailed())
            })
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


export const ordersFetch = ()=>{
    return dispatch =>{
        ordersFetchStart();
        axios.get('/orders.json').then((response)=>{
            let orders = []
            const data = response.data
            for (let key in response.data){
                orders.push({...data[key],
                            id:key}
                             )
              
            }
            
            this.setState({loading:false,orders:orders})
        }).catch((error)=>{
            this.setState({loading:false})
        })
    }
}
