import React,{Component} from 'react';

import Burger from '../../components/Burger/Burger';

import Aux from '../../hoc/Auxiliary/Aux'
import burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            meat:0,
            salad:0,
            bacon:0,
            cheese:0
        }
    }
    render(){
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients} />
                </div>
                <div>Buruger Control</div>
            </Aux>
        )
    }
}



export default BurgerBuilder;