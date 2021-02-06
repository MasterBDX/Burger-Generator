import React from 'react';

import classes from './Order.module.css';

const order = ()=>(
    <div className={classes.Order}>
        <p>Ingredients:</p>
        <p>Salad (3)</p>
        <p>Meet (3)</p>
        <p>Bacon (3)</p>
        <p>Cheese</p>
        <hr />
        Price : 40$
    </div>
)