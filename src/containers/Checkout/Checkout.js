import React, { Component } from 'react';
import { Route } from 'react-router-dom';

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
                    ingredients={this.state.ingredients} />

                <Route path="/checkout/content-data/" render={
                    (props) => {
                        return <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />
                    }} />

            </div>
        )
    }
    componentDidMount() {
        let ingredients = {}
        const query = new URLSearchParams(this.props.location.search)
        let price = 0;
       
        for (let param of query.entries()) {
            if (param[0] === 'totalPrice') {
                price = Number(param[1]);
            } else {
                ingredients[param[0]] = Number(param[1]);
            }
        }

        this.setState({ ingredients: ingredients, price: price })
    }
}

export default Checkout;