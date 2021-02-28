import React, { Component } from 'react';
import axios from '../../../axios/axios-orders';
import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

const inputGenerator = (inputtype, config, validators, value) => {
    return {
        inputtype: inputtype,
        config: config,
        value: value,
        validators: validators

    }
}

class ContactData extends Component {
    state = {
        contactData: {
            email: inputGenerator('input',
                { type: 'email', placeholder: 'Email Address' },
                { required: true },
                ''),
            fullname: inputGenerator('input',
                { type: 'text', placeholder: 'Fullname' },
                { required: true },
                ''),
            city: inputGenerator('input',
                { type: 'text', placeholder: 'City' },
                { required: true },
                ''),
            street: inputGenerator('input',
                { type: 'text', placeholder: 'Street' },
                { required: true },
                ''),
            zipcode: inputGenerator('input',
                { type: 'text', placeholder: 'ZIP Code' },
                { required: true },
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
            totalPrice: this.props.price,
            customer: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                })

                this.props.history.push('/')
            })
            .catch(errors => {
                this.setState({
                    loading: false,
                })
            })
    }

    inputChangeHandler = (event, identifier) => {
        const clonedData = { ...this.state.contactData };
        const clonedDeepData = { ...clonedData[identifier] };
        clonedDeepData.value = event.target.value;
        clonedDeepData.valid = this.checkValidity(event.target.value,
                                                  clonedDeepData.validators)

        clonedData[identifier] = clonedDeepData;
        console.log(clonedDeepData)
        this.setState({ contactData: clonedData });

    }

    checkValidity(value,rules){
        let isValid = false
        if (rules.required){
            isValid = value !== '' ? true : false  
        }
        return isValid
    }

    render() {
        let inputs = []
        for (let key in this.state.contactData) {
            const input = <Input key={key}
                identifier={key}
                changed={this.inputChangeHandler}
                inputData={this.state.contactData[key]} />
            inputs.push(input)
        }
        let form = (<form onSubmit={this.sendOrderHandler}>
            {inputs}
            <Button btnType="Success">
                Order
                        </Button>
        </form>)
        if (this.state.loading) {
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


export default ContactData