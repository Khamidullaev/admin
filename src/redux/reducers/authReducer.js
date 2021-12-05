import {
  SET_AUTH_CREDENTIALS,
  SET_AUTH_TOKENS,
  CLEAR_ON_SIGNOUT,
  IS_LOADING,
  SET_USER_VERIFIED
} from '../constants'

const INITIAL_STATE = {
  phoneNumber: '',
  accessToken: '',
  refreshToken: '',
  isLoading: false,
  permissions: [],
  login: '',
  verified: true,
  statusPerission: false,
  nextStagePermission: false
}

export default function authReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case SET_AUTH_CREDENTIALS:
      return {
        ...state,
        phoneNumber: payload,
      }
    case SET_AUTH_TOKENS:
      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        permissions: [...payload.permissions, 'dashboard'],
        login: payload.login,
        verified: payload.verified ?? false,
        statusPerission: payload.permissions?.includes("update_entity_status"),
        nextStagePermission: payload.permissions?.includes("move_entity_to_next_stage"),
        
      }

    case SET_USER_VERIFIED:
      return {
        ...state,
        verified: payload ?? false
      }
      
    case CLEAR_ON_SIGNOUT:
      return INITIAL_STATE
    default:
      return state
  }
}

