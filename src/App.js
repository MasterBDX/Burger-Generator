import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Orders';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionsCreators from './store/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';


const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
}) 

const asyncAuth = asyncComponent(()=>{
  return import('./components/Auth/Auth');
})

const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders');
})


class App extends React.Component {
  componentDidMount() {
    this.props.checkAuthStatus()
  }


  render() {
    let routes;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/signout" component={Logout} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }
    return (<div>
      <Layout>
        {routes}
      </Layout>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthStatus: () => { dispatch(actionsCreators.checkAuthStatus()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
