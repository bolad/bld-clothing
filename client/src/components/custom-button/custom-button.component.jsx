import React from 'react';

//import { CustomButtonContainer } from './custom-button.styles';

import './custom-button.styles.scss'

//pull the children off the props that get passed in the CustomButton and destructure all the other props
//conditionally render the class 'google-sign-in' if isGoogleSignIn prop is true, etc.
// const CustomButton = ({children, ...props}) => (
//    <CustomButtonContainer {...props}>
//        {children}
//    </CustomButtonContainer>
    
// );

const CustomButton = ({
    children,
    isGoogleSignIn,
    inverted,
    ...otherProps
  }) => (
    <button
      className={`${inverted ? 'inverted' : ''} ${
        isGoogleSignIn ? 'google-sign-in' : ''
      } custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );

export default CustomButton;