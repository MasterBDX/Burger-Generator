import React from 'react';
import { Route, Switch,withRouter } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actionsCreators from './store/index';


function App(props) {
  props.checkAuthStatus()
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/signout" component={Logout} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = dispatch=>{
  return {
    checkAuthStatus:()=>{dispatch(actionsCreators.checkAuthStatus())}
  }
}

export default connect(null,mapDispatchToProps)(App);
