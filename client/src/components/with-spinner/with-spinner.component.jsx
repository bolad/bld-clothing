import React from 'react';

import Spinner from '../spinner/spinner.component';

// create new high order WithSpinner component that takes in a WrappedComponent eg. 
// CollectionsOverview, and gives back a Spinner component that wil render the 
// WrappedComponent when the loading is false
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps}) => {
    return isLoading ? (<Spinner />) : (<WrappedComponent {...otherProps} />);
};

export default WithSpinner;
