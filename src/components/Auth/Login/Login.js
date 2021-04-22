import React from 'react';

import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import classes from './Login.module.css';

const inputGenerator = (inputtype, config, validators, value) => {
    let valid = false
    if (inputtype === 'select') {
        valid = true;
    }
    return {
        inputtype: inputtype,
        config: config,
        value: value,
        validators: validators,
        valid: valid,
        touched: false
    }
}

class Login extends React.Component{
    state = {
        dataControls: {
            email: inputGenerator('input',
                { type: 'email', placeholder: 'Email Address' },
                {
                    required: true,
                    isEmail:true
                },
                ''),
            password: inputGenerator('input',
                { type: 'password', placeholder: 'Password'},
                {
                    required: true,
                    minLength: 8
                },
                ''),
        },
        formIsValid: false,
    }
    
    sendReuqestHandler = (event) => {
        event.preventDefault();
        
    }

    inputChangeHandler = (event, identifier) => {
        const clonedData = { ...this.state.dataControls };
        const clonedDeepData = { ...clonedData[identifier] };
        clonedDeepData.value = event.target.value;
        clonedDeepData.valid = this.checkValidity(event.target.value,
        clonedDeepData.validators)
        clonedDeepData.touched = true;
        clonedData[identifier] = clonedDeepData;
        let formIsValid = true;
        for (let inputIdentifier in clonedData) {
            formIsValid = clonedData[inputIdentifier].valid && formIsValid
        }
        this.setState({ dataControls: clonedData, formIsValid: formIsValid });
    }

    checkValidity(value, rules) {
        let isValid = true
        if (rules.required) {
            isValid = value !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid
    }

       render() {
        let inputs = []
        for (let key in this.state.dataControls) {
            const input = <Input key={key}
                identifier={key}
                changed={this.inputChangeHandler}
                invalid={!this.state.dataControls[key].valid}
                shouldValid={this.state.dataControls[key].validators}
                touched={this.state.dataControls[key].touched}
                inputData={this.state.dataControls[key]} />
            inputs.push(input)
        }
        let form = (<form onSubmit={this.sendReuqestHandler}>
            {inputs}
            <Button btnType="Success"
                disabled={!this.state.formIsValid} >
                submit
            </Button>
        </form>)

    if (this.props.loading) {
            form = <Spinner />
        }
        return (<div className={classes.Login}>
                    <h3>
                        Login
                        <hr />
                    </h3>
                    {form}
                </div>)
    }
}


export default Login