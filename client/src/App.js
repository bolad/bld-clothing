import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

import { checkUserSession } from './redux/user/user.actions';

import Spinner from './components/spinner/spinner.component';


import { GlobalStyle } from './global.styles';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const Header = lazy(() => import('./components/header/header.component'))

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
    //The effect "depends on" checkUserSession so we pass it in the array argument
  }, [checkUserSession] );

  return (
    <div>
      <GlobalStyle />
      <Suspense fallback={ <Spinner /> }>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              currentUser ? (
                <Redirect to="/" />
                ) : (
                  <SignInAndSignUpPage />
                )
                } 
            />
        </Switch>
      </Suspense>
    </div>
  );
}

//get currentUser from the userReducer from redux state(rootReducer) 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);