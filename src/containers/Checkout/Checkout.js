import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {
    state = {ingredients :{
        bacon:null,
        cheese:null,
        meat:null,
        salad:null,
    }}

    checkoutCanceledHandler = ()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = ()=>{
        this.props.history.push('/checkout/content-data');
    }

    render (){
        return (
            <div>
                <CheckoutSummary 
                    checkoutCanceled = {this.checkoutCanceledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients}/>
            </div>
        )
    }
    componentDidMount(){
        let ingredients = {}
        const query = new URLSearchParams(this.props.location.search)
        for (let param of query.entries() ){  
            ingredients[param[0]] = Number(param[1])
        }
        
        this.setState({ingredients:ingredients})
    }
}

export default Checkout ;