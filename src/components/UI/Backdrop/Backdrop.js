import React from 'react';

import classes from './Backdrop.module.css';

const backDrop = (props) => {
    return (props.show ? <div onClick={props.puchaseCancel} 
                             className={classes.Backdrop}></div> : null
            ) 
}


export default backDrop;


