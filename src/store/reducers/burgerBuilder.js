import * as actionsTypes from '../actions/actionTypes';

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
    defaultPrices:IngredientsPrices
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:
            
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] + 1
                },
                totalPrice: state.totalPrice + state.defaultPrices[action.ingName]
            }
        case actionsTypes.REMOVE_INGREDIENT:
            
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1
                },
                totalPrice: state.totalPrice - state.defaultPrices[action.ingName]
            }
        case actionsTypes.RESET_INGREDIENTS:
            return {
                ...initialState
            }
        case actionsTypes.SET_INGREDIENTS:
                return {
                    ...state,
                    ingredients:action.ingredients,
                    error:false
                }
        case actionsTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
            
        default:
            return state
    }
    
}

export default reducer;