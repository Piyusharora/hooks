/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';

import Order from '../../Order/Order.module';
import axios from '../../../axios-orders.module';
import withErrorHandler from '../hoc/withErrorHandling/withErrorHandler.module';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner.module';
import * as actions from '../../../store/actions/index.module';

const orders = props => {
    const { onFetchOrders } = props;
  
    useEffect(() => {
      onFetchOrders(props.token, props.userId);
    }, [onFetchOrders, props.token, props.userId]);
  
    let orders = <Spinner />;
    if (!props.loading) {
      orders = props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  };
  
  const mapStateToProps = state => {
    return {
      orders: state.order.orders,
      loading: state.order.loading,
      token: state.auth.token,
      userId: state.auth.userId
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onFetchOrders: (token, userId) =>
        dispatch(actions.fetchOrders(token, userId))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withErrorHandler(orders, axios));
  