import React from 'react';

import classes from './Order.module.css';

const order = ()=>(
    <div className={classes.Order}>
       
        <p>Ingredients : Salad (2),
                         Meet (2),
                         Bacon (1),
                         Cheese(2)
        </p>
       <br />
        Prices : 40$
    </div>
)

export default order;