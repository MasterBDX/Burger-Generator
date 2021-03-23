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