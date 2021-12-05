import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import authReducer from './authReducer'
import systemReducer from './systemReducer'
import { persistReducer } from 'redux-persist'
import alertReducer from './alertReducer'

const authPersistConfig = {
  key: 'auth',
  storage,
}

const rootReducer = combineReducers({
  system: systemReducer,
  alert: alertReducer,

  auth: persistReducer(authPersistConfig, authReducer),

})

export default rootReducer
