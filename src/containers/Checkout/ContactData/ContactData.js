import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios/axios-orders';

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
                console.log(this.props)
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
                        <input type="text" name="Full Name" placeholder="Fullname" />
                        <input type="text" name="Email" placeholder="Email" />
                        <input type="text" name="Address" placeholder="Address" />
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