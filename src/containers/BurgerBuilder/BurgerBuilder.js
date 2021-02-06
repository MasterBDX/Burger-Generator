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
        ingredients:null,
        totalPrice:0,
        purchasable:false,
        purchasing:false,
       
        loading:false,
        error:null
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
        let ingredientsQuery = []
        for(let q in this.state.ingredients ){
            const query = `${encodeURIComponent(q)}=${encodeURIComponent(this.state.ingredients[q])}`
            ingredientsQuery.push(query)
        }
        ingredientsQuery.push(`totalPrice=${this.state.totalPrice}`)
        this.props.history.push({pathname:'/checkout',
        search:ingredientsQuery.join('&')})
        
    }


    updatePurchasableHandler = (price) => {
        if (price > 0){
            this.setState({purchasable:true})
        }else{
            this.setState({purchasable:false})
        }
    }

    getDefaultPrice = (ingredients)=>{
            let price = 0
            for (const key in ingredients ){
                price += ingredients[key] * IngredientsPrices[key]
            }
            return price
    }

    render(){
        const disabledInfo = {...this.state.ingredients}
        
        let order = <OrderSummary 
                    totalPrice={this.state.totalPrice}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients} />
        let burger = (
                    <Aux>
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
        if (!this.state.ingredients && this.state.error){
            burger = ( <p style={{'textAlign':'center'}} >
            Error has been occurred cannot bring the ingredients
           </p>)
            order = <LoadingSpinner />
        }
        else if (!this.state.ingredients) {

            burger = <LoadingSpinner />
            order = <LoadingSpinner />
            
        }        

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
                {burger}    
                
            </Aux>
        )
    }
    componentDidMount(){
        axios.get('/ingredients.json').then(response=>{
            const price = this.getDefaultPrice(response.data)
            const purchasable = price > 0 ? true:false
            this.setState({ingredients:response.data,
                           totalPrice:price,
                           purchasable:purchasable})
        }).catch(error=>{
            
           this.setState({error:error})
        })
    }

}



export default withErrorHandler(BurgerBuilder,axios);