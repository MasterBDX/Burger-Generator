import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement;
    
    switch(props.inputData.inputtype){
        case ('input'):
            inputElement = <input onChange={(event)=>props.changed(event,props.identifier)} className={classes.InputElement} {...props.inputData.config} /> 
            break;
        case( 'textarea' ):
            inputElement = <textarea onChange={(event)=>props.changed(event,props.identifier)} className={classes.InputElement} {...props.inputData.config} />
            break;
        case( 'select' ):
            inputElement = <select onChange={(event)=>props.changed(event,props.identifier)} className={classes.InputElement}>
                                    {props.inputData.config.options.map((option)=>{
                                        return <option key={option.value} value={option.value}>
                                                {option.displayValue}
                                        </option>
                                    })}
                                </select>
            break;
        default:
            inputElement = <input onChange={(event)=>props.changed(event,props.identifier)} className={classes.InputElement} {...props.inputData.config} />
    } 
    return (<div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>)
}

export default input