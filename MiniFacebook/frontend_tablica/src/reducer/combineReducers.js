import {combineReducers} from 'redux'
import {offersReducer} from './offersReducer'
import {HeaderOffReducer} from './headerOffReducer'
import {logReducer} from './logReducer'
const Combine = combineReducers({
    offers: offersReducer,
    headOff: HeaderOffReducer,
    log: logReducer
})
export default Combine