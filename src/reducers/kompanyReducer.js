import {
  KOMPANY_ERROR,
  KOMPANY_SUCCESS,
  KOMPANY_REQUEST,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  data: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case KOMPANY_REQUEST:
      return {
        ...state,
        isFetching: payload.isFetching,
      };

    case KOMPANY_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isFetching: payload.isFetching,
      };

    default:
      return state;
  }
};