import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    //convert item price to cents as required by stripe
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_poz6zOeCT6kr5Dhess7tMBJ300fxU9kZpI";

    const onToken = token => {
        console.log(token);
        alert("Payment was successful")
    }
    return (
        <StripeCheckout 
            label="Pay Now"
            name="BLD Clothing Ltd"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            tokne={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;

