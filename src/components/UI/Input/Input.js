import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement;
    console.log(props)
    switch(props.inputData.inputtype){
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props.inputData.config} /> 
            break;
        case( 'textarea' ):
            inputElement = <textarea className={classes.InputElement} {...props.inputData.config} />
            break;
        case( 'select' ):
            inputElement = <select className={classes.InputElement}>
                                    {props.inputData.config.options.map((option)=>{
                                        return <option value={option.value}>
                                                {option.displayValue}
                                        </option>
                                    })}
                                </select>
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.inputData.config} />
    } 
    return (<div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>)
}

export default input