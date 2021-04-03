/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from "react";
import BuildControls from "../../Burger/BuildControls/BuildControls.module.js";
import Burger from "../../Burger/Burger.module";
import Auxx from "../hoc/Auxx/Auxx.module";
import Modal from "../../UI/Modal/Modal.module";
import OrderSummary from '../../Burger/OrderSummary/OrderSummary.module'
import axios from "../../../axios-orders.module";
import Spinner from "../../UI/Spinner/Spinner.module.js";
import withErrorHandler from '.././hoc/withErrorHandling/withErrorHandler.module';
import {useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index.module';
const burgerBuilder = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    const [purchasing, setPurchasing] = useState(false);
  
    const dispatch = useDispatch();
  
    const ings = useSelector(state => {
      return state.burgerBuilder.ingredients;
    });
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
  
    const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = ingName =>
      dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(
      () => dispatch(actions.initIngredients()),
      [dispatch]
    );
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path =>
      dispatch(actions.setAuthRedirectPath(path));
  
    useEffect(() => {
      onInitIngredients();
    }, [onInitIngredients]);
  
    const updatePurchaseState = ingredients => {
      const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey];
        })
        .reduce((sum, el) => {
          return sum + el;
        }, 0);
      return sum > 0;
    };
  
    const purchaseHandler = () => {
      if (isAuthenticated) {
        setPurchasing(true);
      } else {
        onSetAuthRedirectPath('/checkout');
        props.history.push('/auth');
      }
    };
  
    const purchaseCancelHandler = () => {
      setPurchasing(false);
    };
  
    const purchaseContinueHandler = () => {
      onInitPurchase();
      props.history.push('/checkout');
    };
  
    const disabledInfo = {
      ...ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  
    if (ings) {
      burger = (
        <Auxx>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={updatePurchaseState(ings)}
            ordered={purchaseHandler}
            isAuth={isAuthenticated}
            price={price}
          />
        </Auxx>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ings}
          price={price}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      );
    }
    // {salad: true, meat: false, ...}
    return (
      <Auxx>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxx>
    );
  };
  
  export default withErrorHandler(burgerBuilder, axios);