import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
        return (
            <div>
                <CheckoutSummary
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ingredients} />

                <Route path="/checkout/content-data/" component={ContactData} />

            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
        ingredients:state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);