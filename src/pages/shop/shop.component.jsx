import React from 'react'
import CollectionsOverview from '../../components/collections-overview/collections-overview.components';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//Route makes available its props match, history and location
//match.path gives us the /shop path defined in App.js for ShopPage
class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsuscribeFromSnapShot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        const collectionRef = firestore.collection('collections');
        this.unsuscribeFromSnapShot = collectionRef.onSnapshot( async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false })
        })
    }

    render () {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={ `${match.path}`} 
                    render={props => (
                        <CollectionsOverviewWithSpinner isLoading={ loading } {...props} />
                    )}
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={props => (
                        <CollectionPageWithSpinner isLoading={ loading } {...props} />
                    )} 
                />
            </div>
        )
    }
}

const matchDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => 
        dispatch(updateCollections(collectionsMap))
});

export default connect(null, matchDispatchToProps)(ShopPage);