import React,{Component} from 'react';
import Auxx from '../containers/hoc/Auxx.module';
import classes from './Layout.module.css';
import Toolbar from  '../Navigation/Toolbar/Toolbar.module.js'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.module';
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
    <Toolbar drawerToggleClicked={this.sideDrawerToggleHander} />
    <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHander}/>
        <main className={classes.Content}> 
         {this.props.children}
        </main>
        </Auxx>
        )

    }
}
export default Layout;