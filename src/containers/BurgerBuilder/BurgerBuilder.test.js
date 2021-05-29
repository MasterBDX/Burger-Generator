import React from 'react';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import NavigationsItems from '../../components/Navigation/NavigationItems/NavigationItems';

configure({adapter:new Adapter()});

describe('Navigation Items Componenet',()=>{
    let wrapper ;
    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder initIngredient={()=>{}} />);
    })

    it('Check if Burger Builder have BurgerControls Com if we pass ingredients prop',()=>{
        wrapper.setProps({
            ingredients:{salad:0}
        })
        expect(wrapper.find(BurgerControls)).toHaveLength(1);

    })

})