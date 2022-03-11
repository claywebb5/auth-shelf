import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* editItem (action){
    try {
        axios.put(`/api/shelf/${action.payload.id}`);
        console.log('in editItem');
        //dispatch to shelf reducer
        yield put({ type: 'FETCH_SHELF'})
    } 
    catch {
        console.log('editItem error');
    }
}

function* editItemSaga() {
    yield takeLatest('EDIT_ITEM', editItem);
}

export default editItemSaga;