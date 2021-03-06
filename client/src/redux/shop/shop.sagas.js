//listen for every action of a specific type passed to it
import { takeEvery, call, put, all } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap, 
            snapshot
        );
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }

    //     this.unsuscribeFromSnapShot = collectionRef.onSnapshot( async snapshot => {**Observable call**
    //     collectionRef.get().then(snapshot => { //**Promise based async call**
    //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //         dispatch(fetchCollectionsSuccess(collectionsMap));
    //     }).catch(error => dispatch(
    //         fetchCollectionsFailure(error.message)
    //     ));
    // 

}

export function* fetchCollectionsStart() {
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield(all([
        call(fetchCollectionsStart)
    ]))
}