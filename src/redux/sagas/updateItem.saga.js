import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* updateItem(action) {
    try {
        axios.put(`/api/shelf/${action.payload.id}`, action.payload);
        console.log('in updateItem', action.payload);
        //dispatch to shelf reducer
        yield put({ type: 'FETCH_SHELF'})
    } 
    catch {
        console.log('updateItem error');
    }
}

function* updateItemSaga() {
    yield takeLatest('UPDATE_ITEM', updateItem);
}

export default updateItemSaga;