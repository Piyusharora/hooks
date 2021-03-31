import React,{Component} from 'react';
import Auxx from '../containers/hoc/Auxx.module';
import classes from './Layout.module.css';
import Toolbar from  '../Navigation/Toolbar/Toolbar.module.js'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.module';
import {connect} from 'react-redux';
class Layout extends Component{
   
   state={
       showSideDrawer:true
   }
   sideDrawerClosedHander=() => {
       this.setState({showSideDrawer:false});

   }
      
   sideDrawerToggleHander=()=>{
this.setState((prevState)=>{
return({showSideDrawer:!prevState.showSideDrawer});
   });
}
    render(){
        return(
<Auxx>
    <Toolbar
    isAuth={this.props.isAuthenticated}
    drawerToggleClicked={this.sideDrawerToggleHander} />
    <SideDrawer 
    isAuth={this.props.isAuthenticated}
    open={this.state.showSideDrawer} closed={this.SideDrawerClosedHander}/>
        <main className={classes.Content}> 
         {this.props.children}
        </main>
        </Auxx>
        )

    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect( mapStateToProps )( Layout );