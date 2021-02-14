import React from 'react';

import classes from './Order.module.css';

const order = (props)=>{
    const ingredients = []
    for (let ing in props.ingredients){
        ingredients.push({name:ing,amount:props.ingredients[ing]})
    } 
    return (
    <div className={classes.Order}>
       
        <p>Ingredients : {ingredients.map((i)=>{
            return (<span  style={{
                            textTransform: 'capitalize',
                            display: 'inline-block',
                            margin: '0 8px',
                            border: '1px solid #ccc',
                            padding: '5px'
                            }}>
                    {i.name} ({i.amount})

            </span>)
        })
        }
        </p>
       <br />
        Prices : <b> {props.price}$ </b>
    </div>
)}

export default order;