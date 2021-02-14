import React, { Component } from 'react';
import axios from '../../../axios/axios-orders';
import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        contactData: {
            email: "",
            fullname: "",
            address: {
                city: "",
                street: "",
                zipcode: ""
            }
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
        let form = (<form>
                        <Input inputtype="input" name="Full Name" placeholder="Fullname" />
                        <Input inputtype="input" name="Email" placeholder="Email" />
                        <Input inputtype="input" name="Address" placeholder="Address" />
                        <Input inputtype="input" name="zipcode" placeholder="ZIP Code" />
                        <Input inputtype="textarea" name="description" placeholder="Description" />
                        
                        <Button btnType="Success"
                            clicked={this.sendOrderHandler}
                        >
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