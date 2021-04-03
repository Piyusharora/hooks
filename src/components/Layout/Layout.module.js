import React,{useState} from 'react';
import Auxx from '../containers/hoc/Auxx/Auxx.module';
import classes from './Layout.module.css';
import Toolbar from  '../Navigation/Toolbar/Toolbar.module.js'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.module';
import {connect} from 'react-redux';
const layout = props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  
    const sideDrawerClosedHandler = () => {
      setSideDrawerIsVisible(false);
    };
  
    const sideDrawerToggleHandler = () => {
      setSideDrawerIsVisible(!sideDrawerIsVisible);
    };
  
    return (
      <Auxx>
        <Toolbar
          isAuth={props.isAuthenticated}
          drawerToggleClicked={sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={props.isAuthenticated}
          open={sideDrawerIsVisible}
          closed={sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{props.children}</main>
      </Auxx>
    );
  };
  
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
  };
  
  export default connect(mapStateToProps)(layout);
  