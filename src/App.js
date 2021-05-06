import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionsCreators from './store/index';


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
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
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
