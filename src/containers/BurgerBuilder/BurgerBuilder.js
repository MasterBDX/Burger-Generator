import React,{Component} from 'react';

import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Aux'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/axios-orders';
import LoadingSpinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';


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
        purchasing:false,
        loading:false
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
        this.setState({loading:true})
        const order = {ingredients:this.state.ingredients,
                       totalPrice:this.state.totalPrice,
                       custmor:{
                           name:'MasterBDX',
                           address:{
                               street:'Test Street',
                               zipCode:'12345',
                               contry:'Libya'
                           },
                           email:'masterbdxteam@gmail.com',
                           deliveryType:'Fastest'
                       }}
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({
                loading:false
                ,purchasing:false})
            })
        .catch(errors=>{
            this.setState({
                loading:false,
                purchasing:false })
        })
    
        
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
        let order = <OrderSummary 
        totalPrice={this.state.totalPrice}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        ingredients={this.state.ingredients} />
        if (this.state.loading){
            order = <LoadingSpinner />
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux> 
                <Modal modalClose={this.purchaseCancelHandler} 
                       show={this.state.purchasing}>
                    {order}
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



export default withErrorHandler(BurgerBuilder,axios);