import React from 'react'
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.components';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//Route makes available its props match, history and location
//match.path gives us the /shop path defined in App.js for ShopPage
class ShopPage extends React.Component {

    componentDidMount() {
       const { isCollectionsFetching } = this.props;
       fetchCollectionsStartAsync();
    }

    render () {
        const { match, isCollectionsFetching,isCollectionsLoaded } = this.props;
         
        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={ `${match.path}`} 
                    render={props => (
                        <CollectionsOverviewWithSpinner isLoading={ isCollectionsFetching } {...props} />
                    )}
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={props => (
                        <CollectionPageWithSpinner isLoading={ !isCollectionsLoaded } {...props} />
                    )} 
                />
            </div>
        )
    }
}

const matchStateToProps = createStructuredSelector({
    isCollectionsFetching: selectIsCollectionsFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})
const matchDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(matchStateToProps, matchDispatchToProps)(ShopPage);