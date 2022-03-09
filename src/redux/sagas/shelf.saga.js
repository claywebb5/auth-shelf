import { put } from 'redux-saga/effects';
import axios from 'axios';


function* shelfSaga(){
    try {
        const items = yield axios.get('/api/shelf');
        console.log('get all:', items.data);
        //dispatch to shelf reducer
        yield put({ type: 'SET_SHELF', payload: items.data })
    } 
    catch {
        console.log('get all error');
    }
}
export default shelfSaga