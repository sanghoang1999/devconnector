import axios from 'axios';
import {setAlert} from '../actions/alert';
import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR} from '../actions/types';
import setAuthToken from '../utils/setAuthToken';

// Load User

export const loadUser = ()=>async dispatch => {
  if(localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type:USER_LOADED,
      payload:res.data,
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}





//Register user
export const register = ({name,email,password}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type":"application/json"
    }

  }
  const body = JSON.stringify({name,email,password});
  try {
    const res = await axios.post('/api/users',body,config);
    console.log(res.data);
    dispatch({
      type:REGISTER_SUCCESS,
      payload:res.data,
    })
     
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.map(error => dispatch(setAlert(error.msg,'danger')));
    }
    dispatch({
      type:REGISTER_FAIL,

    })
  }
}
