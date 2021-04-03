/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, Suspense} from 'react';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder.module.js';
//import './App.css';
import Layout from './components/Layout/Layout.module.js';
import {Route, Switch,withRouter, Redirect} from 'react-router-dom';
import Logout from './components/containers/Auth/Logout/Logout.module';
import * as actions from './store/actions/index.module';
import { connect } from 'react-redux';
//import asyncComponent from '../src/components/containers/hoc/asyncComponent/asyncComponent.module';



const Checkout = React.lazy(() => {
  return import('./components/Checkout/Checkout.module');
});

const Orders = React.lazy(() => {
  return import('./components/containers/Orders/Orders.module');
});

const Auth = React.lazy(() => {
  return import('./components/containers/Auth/Auth.module');
});

const app = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(app)
);
