import * as actionsTypes from '../actions/actionTypes';

const IngredientsPrices = {
    meat:1.3,
    salad:.5,
    bacon:.7,
    cheese:1.0  
}

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    }
    ,
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
        default:
            return state
    }
    
}

export default reducer;