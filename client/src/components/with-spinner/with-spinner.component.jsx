import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

// create new high order WithSpinner component that takes in a WrappedComponent eg. 
// CollectionsOverview, and gives back a Spinner component that wil render the 
// WrappedComponent when the loading is false
const WithSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps}) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} />
        );
    };
    return Spinner;
}

export default WithSpinner;
