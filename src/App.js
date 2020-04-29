import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { checkUserSession } = this.props;
    checkUserSession();

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
    //     //whenever the document snapShot object updates
    //     userRef.onSnapshot(snapShot => {
    //       //set the currentUser state to the snapShot data
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   } else {
    //     setCurrentUser(userAuth)
    //   }
    //   //addCollectionAndDocuments('collections', collectionsArray.map(( {title, items }) => ({ title, items })));
    // });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to="/" />
               ) : (
                 <SignInAndSignUpPage />
               )
               } 
            />
        </Switch>
      </div>
    );
  }
}

//get currentUser from the userReducer from redux state(rootReducer) 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);