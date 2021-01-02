import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle toggleDrawerClick={props.sideDrwerhandler} />
        <div style={{height:'100%'}}><Logo/></div>
        <nav className={classes.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
);


export default toolbar;