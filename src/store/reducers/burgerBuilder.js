import * as actionsTypes from '../actions/actionTypes';
import updateObject from '../utility';

const IngredientsPrices = {
    meat:1.3,
    salad:.5,
    bacon:.7,
    cheese:1.0  
}

const initialState = {
    ingredients: null,
    error:false,
    totalPrice: 0,
    defaultPrices:IngredientsPrices,
    building:false
}

const addIng = (state,action)=>{
    const addIngsObj = updateObject(state.ingredients,{[action.ingName]: state.ingredients[action.ingName] + 1})
    const updatedAddProps = updateObject(state,
                                {
                                 ingredients:addIngsObj,
                                 totalPrice: state.totalPrice + state.defaultPrices[action.ingName],
                                 building:true
                                })
    return updatedAddProps
}

const removeIng = (state,action)=>{
    const removeIngsObj = updateObject(state.ingredients,{[action.ingName]: state.ingredients[action.ingName] + 1})
    const updatedRemoveProps = updateObject(state,
                                {
                                 ingredients:removeIngsObj,
                                 totalPrice: state.totalPrice + state.defaultPrices[action.ingName],
                                 building:true
                                })
    return updatedRemoveProps
}


const setIngs = (state,action)=>{
    const setUpdatedProps = { ingredients:action.ingredients,
                                error:false,
                                totalPrice:0,
                            }
        const setUpdatedObj = updateObject(state,setUpdatedProps)
        return setUpdatedObj
}

const fetchIngsFailed = (state,action)=>{
    return updateObject(state,{error:true,
                               building:false})
} 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:return addIng(state,action);
        case actionsTypes.REMOVE_INGREDIENT: return removeIng(state,action)
        case actionsTypes.RESET_INGREDIENTS: return {...initialState }
        case actionsTypes.SET_INGREDIENTS:return setIngs(state,action)
        case actionsTypes.FETCH_INGREDIENTS_FAILED:return fetchIngsFailed(state,action)            
        default: return state 
    }
    
}

export default reducer;