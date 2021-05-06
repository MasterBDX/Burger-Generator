import React from 'react';

import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actionsCreators from '../../store/index';

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

class Auth extends React.Component {
    state = {
        isSignUp: false,
        dataControls: {
            email: inputGenerator('input',
                { type: 'email', placeholder: 'Email Address' },
                {
                    required: true,
                    isEmail: true
                },
                ''),
            password: inputGenerator('input',
                { type: 'password', placeholder: 'Password' },
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
        const email = this.state.dataControls.email.value;
        const password = this.state.dataControls.password.value;
        const isSignUp = this.state.isSignUp;
        
        this.props.authCallBack(email, password,isSignUp);

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

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(
            (oldState) => {
                return {
                  isSignUp: !oldState.isSignUp
                }
            })

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
                {this.state.isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

            <div>
                <Button btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        </form>)
        
        if (this.props.loading) {
            form = <Spinner />
        }
        let error = null;
        if (this.props.error){
            error = (
                <p>
                    {this.props.error.message}
                </p>
            )
        }
        let authRedirect = null
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.redirectPath} />
        }
        return (<div className={classes.Auth}>
            {authRedirect}
            <h3>
                {this.state.isSignUp ? 'SignUP' : 'Login'}
                <hr />
            </h3>
            {error}
            {form}
        
        </div>)
    }
    componentDidMount(){
        if (!this.props.building){
            this.props.getAuthRedirectPath('/');
        }
    }
}

const mapStateToProps = state =>{

    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.idToken,
        redirectPath:state.auth.redirectPath,
        building:state.burgerBuilder.building,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCallBack: (email, password,isSignUp) => dispatch(actionsCreators.auth(email, password,isSignUp)),
        getAuthRedirectPath:(path) =>{actionsCreators.getAuthRedirectPath(path)}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)