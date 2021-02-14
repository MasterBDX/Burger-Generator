import React, { Component } from 'react';
import axios from '../../../axios/axios-orders';
import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

const inputGenerator = (inputtype,config,value)=>{
    return {
        inputtype:inputtype,
        config:config,
        value:value
    }
}

class ContactData extends Component {
    state = {
        contactData: {
            email: inputGenerator('input',
                                  {type:'email',placeholder:'Email Address'},
                                ''),
            fullname: inputGenerator('input',
                        {type:'text',placeholder:'Fullname'},
                        ''),
            city: inputGenerator('input',
                    {type:'text',placeholder:'City'},
                    ''),
            street: inputGenerator('input',
                            {type:'text',placeholder:'Street'},
                                ''),
            zipcode: inputGenerator('input',
                            {type:'text',placeholder:'ZIP Code'},
                            ''),
            deliveryType: inputGenerator('select',
                    {options:[ 
                                {value:'fastest',displayValue:'Fastest'},
                                {value:'cheapest',displayValue:'Cheapest'}
                            ]
                    },
                    ''),
            
        },
        ingredients: null,
        loading: false
    }

    sendOrderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            custmor: {
                name: 'MasterBDX',
                address: {
                    street: 'Test Street',
                    zipCode: '12345',
                    contry: 'Libya'
                },
                email: 'masterbdxteam@gmail.com',
                deliveryType: 'Fastest'
            }
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
    render() {
        let inputs = []
        for (let key in this.state.contactData){
            const input = <Input key={key} 
                                 inputData={this.state.contactData[key]}/>
            inputs.push(input)
        }   
        let form = (<form>
                        {inputs}
                        <Button btnType="Success"
                                clicked={this.sendOrderHandler}>
                            Order
                        </Button>
                    </form>)
        if (this.state.loading){
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