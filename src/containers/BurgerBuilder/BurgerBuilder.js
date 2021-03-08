import  {connect} from 'react-redux';
import * as actionsTypes from '../../store/actions';

import React,{Component} from 'react';

import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Aux'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/axios-orders';
import LoadingSpinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';




class BurgerBuilder extends Component {
    state = {
        purchasing:false,
        loading:false,
        error:null
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
        if (!this.props.ingredients && this.state.error){
            burger = ( <p style={{'textAlign':'center'}} >
            Error has been occurred cannot bring the ingredients
           </p>)
            order = <LoadingSpinner />
        }
        else if (!this.props.ingredients) {

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
            this.setState({ingredients:response.data,
                           totalPrice:price,
                           })
        }).catch(error=>{
            
           this.setState({error:error})
        })
    }
}

const mapStateToProps = (state) =>{
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        defaultPrices:state.defaultPrices
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addIngredient:(ingName) => {
                                    dispatch({type:actionsTypes.ADD_INGREDIENT,
                                              ingName:ingName
                                            })
                                        },
        removeIngredient:(ingName) => {dispatch({type:actionsTypes.REMOVE_INGREDIENT,
                                                ingName:ingName})
                                        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));