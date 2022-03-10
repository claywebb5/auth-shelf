import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* addItem (action){
    try {
        axios.post('/api/shelf', action.payload);
        console.log('in addItem - action.payload', action.payload);
        //dispatch to shelf reducer
        yield put({ type: 'FETCH_SHELF'})
    } 
    catch {
        console.log('addItem error');
    }
}

function* addItemSaga() {
    yield takeLatest('ADD_ITEM', addItem);
}

export default addItemSaga;