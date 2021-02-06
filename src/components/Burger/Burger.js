import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    let formatedIngredients = Object.keys(props.ingredients)
   
    .map(ingKey => {
        const ingredNum = props.ingredients[ingKey]
        return [...Array(ingredNum)].map(
                (_,index) => (
                    <BurgerIngredient key={ingKey + index} type={ingKey} />
                            )
                    )
                    
            }
        
            ).reduce((arr,el)=>{
                return arr.concat(el)
            },[])
    if (formatedIngredients.length === 0){
        formatedIngredients = (<p>
            Please Add The Burger Ingredients !
        </p>)
    }

                
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {formatedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}


export default burger;