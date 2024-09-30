import { createStore } from 'redux';
import ratingReducer from '../reducers/ratingReducers';

const store = createStore(ratingReducer);
// vecchia sintassi per inizializzare lo store
export default store;