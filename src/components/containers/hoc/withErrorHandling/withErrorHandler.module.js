    import React from 'react';
import Modal from '../../../UI/Modal/Modal.module';
import Auxx from '../Auxx/Auxx.module';
import useHttpErrorHandler from '../../../../hooks/http-error-handler.module';
const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
      const [error, clearError] = useHttpErrorHandler(axios);
  
      return (
        <Auxx>
          <Modal show={error} modalClosed={clearError}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </Auxx>
      );
    };
  };
  
  export default withErrorHandler;