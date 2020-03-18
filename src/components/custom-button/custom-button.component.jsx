import React from 'react';
import './custom-button.styles.scss';

//pull the children off the props that get passed in the CustomButton and destructure all the other props
const CustomButton = ({ children, ...otherProps}) => (
    <button className="custom-button" {...otherProps}>
         {children}
    </button>
);

export default CustomButton;