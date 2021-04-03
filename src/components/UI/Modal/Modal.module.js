
import React from 'react';
import Auxx from '../../containers/hoc/Auxx/Auxx.module';
import Backdrop from '../Backdrop/Backdrop.module';
import classes from './Modal.module.css';

const modal = props => {
    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }
  
    return (
      <Auxx>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
          }}
        >
          {props.children}
        </div>
      </Auxx>
    );
  };
  
  export default React.memo(
    modal,
    (prevProps, nextProps) =>
      nextProps.show === prevProps.show &&
      nextProps.children === prevProps.children
  );
  