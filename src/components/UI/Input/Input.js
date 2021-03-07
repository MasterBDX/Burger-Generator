import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValid && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch(props.inputData.inputtype){
        case ('input'):
            inputElement = <input onChange={(event)=>props.changed(event,props.identifier)} 
                                  className={inputClasses.join(' ')} 
                                  {...props.inputData.config} /> 
            break;
        case( 'textarea' ):
            inputElement = <textarea onChange={(event)=>props.changed(event,props.identifier)} 
                                     className={inputClasses.join(' ')} 
                                     {...props.inputData.config} />
            break;
        case( 'select' ):
            inputElement = <select onChange={(event)=>props.changed(event,props.identifier)} 
                                   className={inputClasses.join(' ')}>
                                   {props.inputData.config.options.map((option)=>{
                                        return <option key={option.value} value={option.value}>
                                                {option.displayValue}
                                        </option>
                                    })}
                                </select>
            break;
        default:
            inputElement = <input onChange={(event)=>props.changed(event,props.identifier)} 
                                  className={inputClasses.join(' ')} 
                                  {...props.inputData.config} />
    } 
    return (<div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>)
}

export default input