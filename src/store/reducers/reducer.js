import * as actionsTypes from '../actions';

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    }
    ,
    totalPrice: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:
            console.log('add')
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] + 1
                }
            }
        case actionsTypes.REMOVE_INGREDIENT:
            console.log('remove')
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1
                }
            }
        default:
            return state
    }
    
}

export default reducer;