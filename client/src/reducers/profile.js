import {
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE: {
      return {
        ...state,
        profile: payload,
        error: {},
        loading: false
      };
    }
    case GET_PROFILES: {
      return {
        ...state,
        profiles: payload,
        error: {},
        loading: false
      };
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {}
      };
    }
    case PROFILE_ERROR: {
      return {
        ...state,
        error: payload,
        loading: false
      };
    }
    case CLEAR_PROFILE: {
      return {
        ...state,
        loading: true,
        profile: null
      };
    }
    case GET_REPOS: {
      return {
        ...state,
        loading: false,
        repos: payload
      };
    }
    default:
      return state;
  }
}
