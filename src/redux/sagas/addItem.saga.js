import { put } from 'redux-saga/effects';
import axios from 'axios';


function* addItemSaga (action){
    try {
        axios.post('/api/shelf', action.payload);
        console.log('in addItem - action.payload', action.payload);
        //dispatch to shelf reducer
        yield put({ type: 'SET_SHELF', payload: items.data})
    } 
    catch {
        console.log('addItem error');
    }
}

export default addItemSaga;