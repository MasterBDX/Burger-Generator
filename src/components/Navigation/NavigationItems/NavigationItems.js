import React from 'react';

import classes from './NavigationItems.module.css';
import NavItem from './NavigationItem/NavigationItem'


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
         <NavItem link="/" exact>Burger</NavItem>
         <NavItem link="/orders">Orders</NavItem>
         <NavItem link="/auth">Sign In/Up</NavItem>
    </ul>
);


export default navigationItems;