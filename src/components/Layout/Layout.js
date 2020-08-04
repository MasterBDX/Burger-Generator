import React from 'react';

import classes from './Layout.module.css'; 
import Aux from '../../hoc/Auxiliary/Aux';

const Layout = (props) => (
    <Aux>
        <div> ToolBar , Drawer , Back Something </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)



export default Layout;



