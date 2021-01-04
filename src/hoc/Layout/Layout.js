import React, {Component} from 'react';

import classes from './Layout.module.css'; 
import Aux from '../Auxiliary/Aux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


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



