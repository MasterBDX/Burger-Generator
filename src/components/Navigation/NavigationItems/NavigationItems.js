import React from 'react';

import classes from './NavigationItems.module.css';
import NavItem from './NavigationItem/NavigationItem'


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
         <NavItem path="/">Burger</NavItem>
         <NavItem path="/cart">Cart</NavItem>
    </ul>
);


export default navigationItems;