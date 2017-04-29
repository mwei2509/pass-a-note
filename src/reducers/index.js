import paperReducer from './paperReducer'
import pinsReducer from './pinsReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  pins: pinsReducer,
  paper: paperReducer
})

export default rootReducer
