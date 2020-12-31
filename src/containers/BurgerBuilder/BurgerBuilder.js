import React,{Component} from 'react';

import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Aux'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        purchasable:false,
        purchasing:false
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
   
    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }
    purchaseContinueHandler = () => {
        alert('hello world')
    }


    updatePurchasableHandler = (price) => {
        if (price > 0){
            this.setState({purchasable:true})
        }else{
            this.setState({purchasable:false})
        }
    }

    render(){
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux> 
                <Modal puchaseCancel={this.purchaseCancelHandler} 
                       show={this.state.purchasing}>
                    <OrderSummary 
                        totalPrice={this.state.totalPrice}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients} />
                </Modal>    
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    purchasing={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    totalPrice={this.state.totalPrice}  
                    disabledInfo = {disabledInfo}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    />
                
            </Aux>
        )
    }
}



export default BurgerBuilder;