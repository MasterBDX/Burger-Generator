import  {connect} from 'react-redux';

import React,{Component} from 'react';

import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Aux'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/axios-orders';
import LoadingSpinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import * as burgerBuilderActions from '../../store/index';



class BurgerBuilder extends Component {
    state = {
        purchasing:false,
    }
 
    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }
    
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    getDefaultPrice = (ingredients)=>{
        let price = 0
        for (const key in ingredients ){
            price += ingredients[key] * this.props.defaultPrices[key]
        }
        return price
}

    render(){
        const disabledInfo = {...this.props.ingredients}
        
        let order = <OrderSummary 
                    totalPrice={this.props.totalPrice}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    ingredients={this.props.ingredients} />
        let burger = (
                    <Aux>
                        <Burger ingredients={this.props.ingredients} />
                        <BurgerControls
                            purchasing={this.purchaseHandler}
                            purchasable={this.props.totalPrice > 0}
                            totalPrice={this.props.totalPrice}  
                            disabledInfo = {disabledInfo}
                            addIngredient={this.props.addIngredient}
                            removeIngredient={this.props.removeIngredient}
                        />
                    </Aux>
                    )
        if (!this.props.ingredients && this.props.error){
            burger = ( <p style={{'textAlign':'center'}} >
            Error has been occurred can't fetch the ingredients
           </p>)
            order = <LoadingSpinner />
        }
        else if (!this.props.ingredients) {

            burger = <LoadingSpinner />
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
       this.props.initIngredient()
    }
}

const mapStateToProps = (state) =>{
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        defaultPrices:state.defaultPrices,
        error:state.error
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addIngredient:(ingName) => {
                                    dispatch(burgerBuilderActions.addIngredient(ingName))
                                        },
        removeIngredient:(ingName) => {dispatch(burgerBuilderActions.removeIngredient(ingName))
                                        },
        initIngredient:() => {dispatch(burgerBuilderActions.initIngredients())
                                        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));