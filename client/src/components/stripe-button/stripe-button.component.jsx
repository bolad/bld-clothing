import React from 'react';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    //convert item price to cents as required by stripe
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_poz6zOeCT6kr5Dhess7tMBJ300fxU9kZpI";

    const onToken = token => {
        console.log(token);

        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful!')
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment! Please make sure you use the test credit card details provided')
        })
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
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;

