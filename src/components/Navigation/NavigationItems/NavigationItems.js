import React from 'react';

import classes from './NavigationItems.module.css';
import NavItem from './NavigationItem/NavigationItem'


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
         <NavItem>Home</NavItem>
         <NavItem>Burger</NavItem>
         <NavItem>Cart</NavItem>
    </ul>
);


export default navigationItems;