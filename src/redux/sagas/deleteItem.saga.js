import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* deleteItem (action){
    try {
        axios.delete(`/api/shelf/${action.payload.id}`);
        console.log('in deleteItem');
        //dispatch to shelf reducer
        yield put({ type: 'FETCH_SHELF'})
    } 
    catch {
        console.log('deleteItem error');
    }
}

function* deleteItemSaga() {
    yield takeLatest('DELETE_ITEM', deleteItem);
}

export default deleteItemSaga;