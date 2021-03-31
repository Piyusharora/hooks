import React, {Component} from 'react';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder.module.js';
//import './App.css';
import Layout from './components/Layout/Layout.module.js';
import {Route, Switch,withRouter, Redirect} from 'react-router-dom';
import Logout from './components/containers/Auth/Logout/Logout.module';
import * as actions from './store/actions/index.module';
import { connect } from 'react-redux';
import asyncComponent from '../src/components/containers/hoc/asyncComponent/asyncComponent.module';



const asyncCheckout=asyncComponent(()=>{
  return import('./components/Checkout/Checkout.module.js')
});

const asyncOrders=asyncComponent(()=>{
  return import('./components/containers/Orders/Orders.module')
});

const asyncAuth=asyncComponent(()=>{
  return import('./components/containers/Auth/Auth.module')
});
class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render(){
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      ); 
    }
  return (
    <div>
    <Layout>
      {routes}
    </Layout>
  </div>
);
}
}

const mapStateToProps = state => {
return {
isAuthenticated: state.auth.token !== null
};
};

const mapDispatchToProps = dispatch => {
return {
onTryAutoSignup: () => dispatch( actions.authCheckState() )
};
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
