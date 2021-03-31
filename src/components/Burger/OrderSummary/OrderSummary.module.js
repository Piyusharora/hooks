import React, { Component } from 'react';
import Auxx from '../../containers/hoc/Auxx.module';

import Button from '../../UI/Button/Button.module' ;
class OrderSummary extends Component{

    render(){
    const ingredientSummary=Object.keys(this.props.ingredients)
.map(igKey=>{
    return (<li key={igKey}>
        <span style={{textTransform:'capitalize'}}>
        {igKey}:{this.props.ingredients[igKey]}
    </span></li>); 
    
} );

return(
<Auxx>
    <h3>Your Order</h3>
    <p>
        A delicious burger with the following ingredients:
    </p>
    <ul>
        {ingredientSummary}
        </ul>
        <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
        <p>Continue To Checkout ?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
  </Auxx>  

);


}
} 

    

export default OrderSummary;