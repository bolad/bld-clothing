import React from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

import CollectionPageContainer from '../collection/collection.container';

//Route makes available its props match, history and location
//match.path gives us the /shop path defined in App.js for ShopPage
class ShopPage extends React.Component {

    componentDidMount() {
       const { fetchCollectionsStartAsync } = this.props;

       //create request for fetching asynchronous data
       fetchCollectionsStartAsync();
    }

    render () {
        const { match } = this.props;
         
        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={ `${match.path}`} 
                    component={ CollectionsOverviewContainer }
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    component={ CollectionPageContainer }
                />
            </div>
        )
    }
}

const matchDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, matchDispatchToProps)(ShopPage);