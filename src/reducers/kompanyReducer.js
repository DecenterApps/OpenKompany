import {
  KOMPANY_ERROR,
  KOMPANY_SUCCESS,
  KOMPANY_REQUEST,
  TRANSACTION_REQUEST,
  TRANSACTION_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  data: {},
  userType: 'founder',
  pendingTransaction: {
    isOpen: false,
    txHash: '',
  },
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

    case TRANSACTION_REQUEST:
      return {
        ...state,
        pendingTransaction: {
          ...state.pendingTransaction,
          isOpen: true,
          txHash: payload.txHash,
        },
      };

    case TRANSACTION_SUCCESS:
      return {
        ...state,
        pendingTransaction: {
          ...state.pendingTransaction,
          isOpen: false,
        },
      };

    default:
      return state;
  }
};