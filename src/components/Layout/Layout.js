import React from 'react';

import classes from './Layout.module.css'; 
import Aux from '../../hoc/Auxiliary/Aux';

import Toolbar from '../Navigation/Toolbar/Toolbar';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)



export default Layout;



