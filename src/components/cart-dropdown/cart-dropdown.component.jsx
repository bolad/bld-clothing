import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? (
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
                ) : (
                    <span className="empty-message">Your cart is empty</span>
                )
            }
        </div>
        <CustomButton onClick={() => history.push('/checkout')}>GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

//wrap the connect function inside withRouter(high order component) so that the 
//CartDropDown component can receive the history prop from withRouter
export default withRouter(connect(mapStateToProps)(CartDropdown));