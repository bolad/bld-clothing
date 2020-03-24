import { createSelector } from 'reselect';

// use an input selector function to get the state and return cart from it
const selectCart = (state) => state.cart

//take an array of input selectors and return a function that returns the value we want
//out of the selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumulatedQuantity, cartItem) =>
                accumulatedQuantity + cartItem.quantity,
                0
        )
);
