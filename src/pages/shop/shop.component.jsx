import React from 'react'
import CollectionsOverview from '../../components/collections-overview/collections-overview.components';
import CollectionPage from '../collection/collection.component';
import { Route } from 'react-router-dom';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

//Route makes available its props match, history and location
//match.path gives us the /shop path defined in App.js for ShopPage
class ShopPage extends React.Component {

    unsuscribeFromSnapShot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections');
        collectionRef.onSnapshot( async snapshot => {
            convertCollectionsSnapshotToMap(snapshot);
        })
    }

    render () {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={ `${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        )
    }
}

export default ShopPage;