import React from 'react';
import BurgerControl from './BurgerControl/BuilderControl';
import classes from './BurgerControls.module.css';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'}
]

const burgerControls = (props) => (
    <div className={classes.BuildControls}>
         <div>Current Price : {props.totalPrice.toFixed(2)}$ </div>
        {controls.map( ctrl =>(
            <BurgerControl 
                    disabled={props.disabledInfo[ctrl.type]}
                    addIngredient = {() => props.addIngredient(ctrl.type)}
                    removeIngredient = {() => props.removeIngredient(ctrl.type)}
                    key={ctrl.label} 
                    label={ctrl.label} />

            ))
        }
        <div className={classes.OrderDiv}>
            <button disabled={!props.purchasable} 
                    className={classes.OrderButton}
                    onClick={props.purchasing}
                    >
                {props.isAuth ? 'Order Now':'SignUp Now To Order'}
            </button>
        </div>
    </div>
)


export default burgerControls;

