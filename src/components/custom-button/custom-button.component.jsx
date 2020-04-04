import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

//pull the children off the props that get passed in the CustomButton and destructure all the other props
//conditionally render the class 'google-sign-in' if isGoogleSignIn prop is true, etc.
const CustomButton = ({children, ...props}) => (
   <CustomButtonContainer {...props}>
       {children}
   </CustomButtonContainer>
    
);

export default CustomButton;