import React, {useEffect, lazy, Suspense} from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import Spinner from '../../components/spinner/spinner.component';

const CollectionPageContainer = lazy(() => import('../collection/collection.container'));
const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));

//Route makes available its props match, history and location
//match.path gives us the /shop path defined in App.js for ShopPage
const ShopPage = ({ match, fetchCollectionsStart }) => {

    useEffect(() => {
        fetchCollectionsStart();
        //re-render only if fetchCollectionsStart changes
    }, [fetchCollectionsStart]);
      
    return (
        <div className="shop-page">
            <Suspense fallback={<Spinner />}>
                <Route 
                    exact 
                    path={ `${match.path}`} 
                    component={ CollectionsOverviewContainer }
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    component={ CollectionPageContainer }
                />
            </Suspense>
        </div>
    )
}

const matchDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, matchDispatchToProps)(ShopPage);