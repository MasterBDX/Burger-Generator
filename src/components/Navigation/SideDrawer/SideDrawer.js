import React from 'react';

import Aux from '../../../hoc/Auxiliary/Aux';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attechmentClasses = [classes.SideDrawer,classes.Close]
    if (props.show){
        attechmentClasses = [classes.SideDrawer,classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.show} 
                      puchaseCancel={props.sideDrwerhandler} />
            <div className={attechmentClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
);
    }

export default sideDrawer;
