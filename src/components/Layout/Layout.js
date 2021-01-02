import React, {Component} from 'react';

import classes from './Layout.module.css'; 
import Aux from '../../hoc/Auxiliary/Aux';

import Toolbar from '../Navigation/Toolbar/Toolbar';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {showSideDrawer:false}
    
    sideDrwerShowHandler = () => {    
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }
    
    render (){
        return <Aux>
            <Toolbar  sideDrwerhandler={this.sideDrwerShowHandler} />
            <SideDrawer show={this.state.showSideDrawer} 
                        sideDrwerhandler = {this.sideDrwerShowHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    }
} 



export default Layout;



