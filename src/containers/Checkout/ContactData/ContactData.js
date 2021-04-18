import React, { Component } from 'react';
import axios from '../../../axios/axios-orders';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import errorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as orderActions from '../../../store/index';

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

class ContactData extends Component {
    state = {
        contactData: {
            email: inputGenerator('input',
                { type: 'email', placeholder: 'Email Address' },
                {
                    required: true,
                    minLength: 8
                },
                ''),
            fullname: inputGenerator('input',
                { type: 'text', placeholder: 'Fullname' },
                {
                    required: true,
                    minLength: 8
                },
                ''),
            city: inputGenerator('input',
                { type: 'text', placeholder: 'City' },
                {
                    required: true,
                    minLength: 8
                },
                ''),
            street: inputGenerator('input',
                { type: 'text', placeholder: 'Street' },
                {
                    required: true,
                    minLength: 8
                },
                ''),
            zipcode: inputGenerator('input',
                { type: 'text', placeholder: 'ZIP Code' },
                {
                    required: true,
                    minLength: 5
                },
                ''),
            deliveryType: inputGenerator('select',
                {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                {},
                'fastest'),

        },
        formIsValid: false,
        ingredients: null,
        loading: false
    }

    sendOrderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData = {};
        for (let identifier in this.state.contactData) {
            formData[identifier] = this.state.contactData[identifier].value
        }
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            customer: formData
        }
        this.props.burgerPurchase(order)
    }

    inputChangeHandler = (event, identifier) => {
        const clonedData = { ...this.state.contactData };
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
        this.setState({ contactData: clonedData, formIsValid: formIsValid });
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
        for (let key in this.state.contactData) {
            const input = <Input key={key}
                identifier={key}
                changed={this.inputChangeHandler}
                invalid={!this.state.contactData[key].valid}
                shouldValid={this.state.contactData[key].validators}
                touched={this.state.contactData[key].touched}
                inputData={this.state.contactData[key]} />
            inputs.push(input)
        }
        let form = (<form onSubmit={this.sendOrderHandler}>
            {inputs}
            <Button btnType="Success"
                disabled={!this.state.formIsValid}
            >
                Order
                        </Button>
        </form>)
        if (this.props.loading) {
            form = <Spinner />
        }
        return (<div className={classes.ContactData}>
            <h3>
                Contact Data
                <hr />
            </h3>
            {form}


        </div>)
    }
}

const mapStateToProps = (state) => {

    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        burgerPurchase: (orderData) => dispatch(orderActions.burgerPurchase(orderData)),
        resetIngredients: () => dispatch(orderActions.resetIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axios))