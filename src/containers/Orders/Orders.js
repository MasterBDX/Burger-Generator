import React,{Component} from 'react';
import axios from '../../axios/axios-orders';
import Order from '../../components/Order/Order';
import errorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component{
    state = {orders:[],
             loading:true}

    componentDidMount(){
            // axios.get('/orders.json').then((response)=>{
            //     let orders = []
            //     const data = response.data
            //     for (let key in response.data){
            //         orders.push({...data[key],
            //                     id:key}
            //                      )
                  
            //     }
                
            //     this.setState({loading:false,orders:orders})
            // }).catch((error)=>{
            //     this.setState({loading:false})
            // })
    }
    
    render(){
        return <div>
                {this.state.orders.map((order)=>(
                    <Order key={order.id} 
                           ingredients={order.ingredients}
                           price={Number.parseFloat(order.totalPrice).toFixed(2)}
                    />
                ))}
           
        </div>
    }
}

export default errorHandler(Orders,axios);