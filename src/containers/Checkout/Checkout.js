import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            bacon: null,
            cheese: null,
            meat: null,
            salad: null,
        },
        price:0
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/content-data');
    }

    render() {
        let summary = (<Redirect to="/" />)
        if(this.props.ingredients){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null 
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ingredients} />
    
                    <Route path="/checkout/content-data/" component={ContactData} />

                </div>
            ) 
        }
        
        return summary
    }

}

const mapStateToProps = (state)=>{
    return {
        ingredients:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);