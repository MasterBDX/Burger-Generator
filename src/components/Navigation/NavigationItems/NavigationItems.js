import React from 'react';

import classes from './NavigationItems.module.css';
import NavItem from './NavigationItem/NavigationItem'


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
         <NavItem link="/" exact>Burger</NavItem>
         <NavItem link="/orders">Orders</NavItem>
         <NavItem link="/signup">SignUp</NavItem>
         <NavItem link="/login">Login</NavItem>
    </ul>
);


export default navigationItems;