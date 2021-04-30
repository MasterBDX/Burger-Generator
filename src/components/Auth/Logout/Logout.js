import React,{Component} from 'react';

import {connect} from 'react-redux';
import {logout} from '../../../store/index';
import {Redirect} from 'react-router-dom';

class Logout extends Component{
    componentDidMount(){
        console.log('why')
        this.props.logout()
    }

    render(){
        return <Redirect to='/' />
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        logout:() => dispatch(logout())
    }
} 

export default connect(null,mapDispatchToProps)(Logout)