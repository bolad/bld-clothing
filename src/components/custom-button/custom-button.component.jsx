import React from 'react';
import './custom-button.styles.scss';

//pull the children off the props that get passed in the CustomButton and destructure all the other props
//conditionally render the class 'google-sign-in' if isGoogleSignIn prop is true
const CustomButton = ({ children, isGoogleSignIn, ...otherProps}) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
         {children}
    </button>
);

export default CustomButton;