import React from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

import CollectionPageContainer from '../collection/collection.container';

//Route makes available its props match, history and location
//match.path gives us the /shop path defined in App.js for ShopPage
class ShopPage extends React.Component {

    componentDidMount() {
       const { fetchCollectionsStart } = this.props;

       //create request for fetching asynchronous data
       fetchCollectionsStart();
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
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, matchDispatchToProps)(ShopPage);