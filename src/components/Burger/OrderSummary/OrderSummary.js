import React ,{Component} from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxiliary/Aux';


class OrderSummary extends Component{
    componentDidUpdate(){
        console.log('Component will Update ')
    }
    
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            (igKey) => {
                return (<li key={igKey}> 
                        <span style={{textTransform:'capitalize'}}> {igKey} </span>
                        : {this.props.ingredients[igKey]}
                        </li>
                )
            }
        )
        ;
         
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the 
                    following ingreients : 
                </p>
                <ul>
                    {ingredientSummary}
                 </ul>
                 <p><strong>Total Price : {this.props.totalPrice.toFixed(2)}$</strong></p>
                 <p>Continue to Checkout ?</p>
                 <Button clicked={this.props.purchaseCancel} btnType='Danger'>Cancel</Button>
                 <Button clicked={this.props.purchaseContinue} btnType='Success'>Continue</Button>
            </Aux>
        )
    }
}


export default OrderSummary;