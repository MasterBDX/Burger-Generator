import React,{Component} from 'react';

import Burger from '../../components/Burger/Burger';

import Aux from '../../hoc/Auxiliary/Aux'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';


const IngredientsPrices = {
    meat:1.3,
    salad:.5,
    bacon:.7,
    cheese:1.0  
}

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            meat:0,
            salad:0,
            bacon:0,
            cheese:0
        },
        totalPrice:0,
        purchasable:false
    }

    updatePurchasableHandler(price){
        if (price > 0){
            this.setState({purchasable:true})
        }else{
            this.setState({purchasable:false})
        }
    }

    addIngredientHandler = (type) =>{
        const oldIngreientCount = this.state.ingredients[type];
        const newIngredientCount = oldIngreientCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newIngredientCount;
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + IngredientsPrices[type]
        
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients})

        this.updatePurchasableHandler(newPrice);
    }
    removeIngredientHandler = (type) =>{

        const oldIngreientCount = this.state.ingredients[type];
        if (oldIngreientCount <= 0){
            return ;
        }
        
        const newIngredientCount = oldIngreientCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newIngredientCount;
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - IngredientsPrices[type]
        
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients})
        this.updatePurchasableHandler(newPrice);
    }
   
    render(){
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients} />
                </div>
                <div>
                    <BurgerControls
                        purchasable={this.state.purchasable}
                        totalPrice={this.state.totalPrice}  
                        disabledInfo = {disabledInfo}
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        />
                </div>
            </Aux>
        )
    }
}



export default BurgerBuilder;