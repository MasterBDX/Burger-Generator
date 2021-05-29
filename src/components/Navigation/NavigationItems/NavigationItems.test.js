import React from 'react';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationsItems from './NavigationItems';
import NavItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()});

describe('Navigation Items Componenet',()=>{
    let wrapper ;
    beforeEach(()=>{
        wrapper = shallow(<NavigationsItems />);
    })
    it('should render two Navigation Item children if not authenticated',()=>{
        expect(wrapper.find(NavItem)).toHaveLength(2);
    })
    it('should render three Navigation Item children if authenticated',()=>{
        wrapper.setProps({
            isAuth:true
        })
        expect(wrapper.find(NavItem)).toHaveLength(3);
    })
    it('Check if SignOut NavigationItem component already exists when authenticated',()=>{
        wrapper.setProps({
            isAuth:true
        })
        expect(wrapper.contains(<NavItem link="/signout">Sign Out</NavItem>)).toEqual(true);
    })
})