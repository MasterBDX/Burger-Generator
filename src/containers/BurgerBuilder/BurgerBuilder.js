import React,{Component} from 'react';

import Burger from '../../components/Burger/Burger';

import Aux from '../../hoc/Auxiliary/Aux'
import burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render(){
        return (
            <Aux>
                <div>
                    <Burger />
                </div>
                <div>Buruger Control</div>
            </Aux>
        )
    }
}



export default BurgerBuilder;