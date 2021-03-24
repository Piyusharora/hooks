import React, { Component } from "react";
import BuildControls from "../../Burger/BuildControls/BuildControls.module.js";
import Burger from "../../Burger/Burger.module";
import Auxx from "../hoc/Auxx.module";
import Modal from "../../UI/Modal/Modal.module";
import OrderSummary from '../../Burger/OrderSummary/OrderSummary.module'
import axios from "../../../axios-orders.module";
import Spinner from "../../UI/Spinner/Spinner.module.js";
import withErrorHandler from '.././hoc/withErrorHandling/withErrorHandler.module';
const INGREDIENTS_PRICES = {
salad:0.5,
cheese:0.4,
meat:1.3,
bacon:0.7
}

class BurgerBuilder extends Component{
    state = {
        
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }
componentDidMount(){
    axios.get('https://react-my-burger-1ab71-default-rtdb.firebaseio.com/ingredients.json')
.then(response=>{
         this.setState({ingredients:response.data})
    })

    .catch(error=>{
this.setState({error:true})
    });
}

    updatePurchaseState(ingredients){
        
        const sum =Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];

        })
        .reduce((sum,el) =>{
          return sum+el;
        },0);
        this.setState({purchasable:sum>0});
    }

    addIngredientHandler=(type) =>{
const oldCount= this.state.ingredients[type];
const updateCount=oldCount +1;
const updateIngredients = {

...this.state.ingredients
};

updateIngredients[type]= updateCount;
const priceAddition=INGREDIENTS_PRICES[type];
const oldPrice=this.state.totalPrice;
const newPrice= oldPrice+priceAddition;
this.setState({totalPrice:newPrice,ingredients:updateIngredients}); 
this.updatePurchaseState(updateIngredients);
}
removeIngredientHandler= (type) => {
    const oldCount= this.state.ingredients[type];
    if(oldCount<=0){
        return;
    }

    const updateCount=oldCount - 1;
    const updateIngredients = {
    
    ...this.state.ingredients
    };

    updateIngredients[type]= updateCount;
    const priceDeduction=INGREDIENTS_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice= oldPrice-priceDeduction;
    this.setState({totalPrice: newPrice,ingredients: updateIngredients}); 
    
    
}
    
purchaseHandler=() =>{

    this.setState({purchasing:true});
}

purchaseCancelHandler = () => {
    this.setState({purchasing:false});

}
purchaseContinueHandler=()=>{
    //alert('you continue');
const queryParams=[];
for(let i in this.state.ingredients){
    queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i]));
}
queryParams.push('price='+this.state.totalPrice);
const queryString=queryParams.join('&');
this.props.history.push({
    pathname:'/checkout',
    search:'?'+queryString
});
//this.props.history.push('/checkout');
}
render(){
    const disabledInfo = {
        ...this.state.ingredients
    };
for(let key in disabledInfo){
    disabledInfo[key] = disabledInfo[key]<=0
}

let orderSummary=null;
let burger=this.state.error?<p>Ingredients can't br loaded!</p>: <Spinner />

if(this.state.ingredients){
    burger=(
        <Auxx>
        <Burger ingredients={this.state.ingredients} />
        
        <BuildControls 
        
        ingredientsAdded={this.addIngredientHandler}
        ingredientsRemoved={this.removeIngredientHandler}
        disabled={disabledInfo}
        
        purchasable={this.state.purchasable}
        ordered={this.purchaseHandler}
        price={this.state.totalPrice}
        
        />
        
        </Auxx>
        );
        orderSummary = <OrderSummary 
ingredients={this.state.ingredients}
price={this.state.totalPrice} 
purchaseCanceled={this.purchaseCancelHandler}
purchaseContinued={this.purchaseContinueHandler} />;
}
if(this.state.loading){

    orderSummary=<Spinner />;

}


    return(
        <Auxx>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
          {burger}

            </Auxx>
    );
}

}
export default withErrorHandler(BurgerBuilder,axios);
