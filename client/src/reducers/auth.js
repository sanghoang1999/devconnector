import {REGISTER_SUCCESS,REGISTER_FAIL,AUTH_ERROR,USER_LOADED} from '../actions/types';

const initialState = {
  token:localStorage.getItem('token'),  
  isAuthenticated:null,
  loading: true,
  user:null,
}
export default function(state=initialState,action) {
  const {type,payload} =action;
  switch(type) {
    case REGISTER_SUCCESS : {
      localStorage.setItem('token',payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated:true,
        loading:false,
      }
    }
    case REGISTER_FAIL : {
      localStorage.removeItem('token');
      return {
        ...state,
        token:null,
        isAuthenticated:false,
        loading:false,
      }
    }
    case USER_LOADED: {
      return {
        ...state,
        ...payload,
        isAuthenticated:true,
        loading:false,
      }
    }
    case AUTH_ERROR : {
      localStorage.removeItem('token');
      return {
        ...state,
        token:null,
        isAuthenticated:false,
        loading:false,
      }
    }
    default :
      return state;
  }
}