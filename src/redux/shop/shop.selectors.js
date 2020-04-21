import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections //state
);

//create a selector to convert the collection object into an array so we can still use 
// .map to iterate over it
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    //Object.keys returns the keys of an object as an array, maps over the array of
    // keys and get the value of the collections object at that key
    collections => 
        collections ? Object.keys(collections).map(key => collections[key]) : []

)

//Find the collection id matching the url param of the collection id map
export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        //look inside the collections map object to find the corresponding colection object
        //and pass it to the CollectionPage component
        collections => collections ? collections[collectionUrlParam] : null
);

export const selectIsCollectionsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    //if our collections is loaded return true, otherwise return false
    shop => !!shop.collections
);
