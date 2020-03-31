import React from 'react'
import CollectionsOverview from '../../components/collections-overview/collections-overview.components';
import CollectionPage from '../collection/collection.component';
import { Route } from 'react-router-dom';

//Route makes available its props match, history and location
//match.path gives us the /shop path defined in App.js for ShopPage
const ShopPage = ({ match}) => (
    <div className="shop-page">
       <Route exact path={ `${match.path}`} component={CollectionsOverview} />
       <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
);

export default ShopPage;