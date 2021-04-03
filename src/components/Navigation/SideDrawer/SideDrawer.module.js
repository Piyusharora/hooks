import React from 'react';
import Auxx from '../../containers/hoc/Auxx/Auxx.module';
import Logo from '../../Logo/Logo.module';
import Backdrop from '../../UI/Backdrop/Backdrop.module';
import NavigationItems from '../NavigationItems/NavigationItems.module';
import classes from './SideDrawer.module.css';
const sideDrawer=(props)=>{
let attachedClasses=[classes.SideDrawer,classes.Close]
if(props.open){
    attachedClasses=[classes.SideDrawer,classes.Open]
}    
return(
        <Auxx>
            <Backdrop show={props.open} clicked={props.closed}/>
<div className={attachedClasses.join(' ')} onClick={props.closed} >
<div className={classes.Logo}>

<Logo />

</div>
<nav>
    <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
    </div>
</Auxx>
    )

}
export default sideDrawer;