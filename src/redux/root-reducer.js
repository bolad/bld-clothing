import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from '../redux/directory/directory.reducer';
import { persistReducer } from 'redux-persist';
//use local storage as default storage
import storage from 'redux-persist/lib/storage';
import shopReducer from './shop/shop.reducer';

//Define a JSON object representing possible configurations we want redux to use
const persistConfig = {
    //key defines at what point inside of our reducer object do we wanna start storing everthing
    key: 'root',
    storage,
    //string names of any reducers we wanna store
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);