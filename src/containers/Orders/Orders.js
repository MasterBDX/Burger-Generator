import React,{Component} from 'react';
import axios from '../../axios/axios-orders';
import Order from '../../components/Order/Order';
import errorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';

class Orders extends Component{

    componentDidMount(){
        
        this.props.ordersFetch(this.props.token,
                               this.props.localId)

    }
    
    render(){
        let orders = <Spinner />
        if (!this.props.loading){
            orders = this.props.orders.map((order)=>(
                <Order key={order.id} 
                    ingredients={order.ingredients}
                    price={Number.parseFloat(order.totalPrice).toFixed(2)}
                />
            ))
        }
        return <div>
            {orders}
        </div>
    }
}


const mapStateToProps = state =>{
    
    return {
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.idToken,
        localId:state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ordersFetch: (token,localId) => dispatch(actions.ordersFetch(token,localId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(Orders,axios));