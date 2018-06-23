import {
  KOMPANY_ERROR,
  KOMPANY_SUCCESS,
  KOMPANY_REQUEST,
  KOMPANIES_ERROR,
  KOMPANIES_REQUEST,
  KOMPANIES_SUCCESS,
  TRANSACTION_REQUEST,
  TRANSACTION_SUCCESS, ICO_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetching: false,
  kompanies: [],
  icos: [],
  data: {},
  userType: 'user',
  pendingTransaction: {
    isOpen: false,
    txHash: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ICO_SUCCESS:
      return {
        ...state,
        icos: payload.data,
      };

    case KOMPANIES_SUCCESS:
      return {
        ...state,
        kompanies: payload.kompanies
      };

    case KOMPANY_REQUEST:
      return {
        ...state,
        isFetching: payload.isFetching,
      };

    case KOMPANY_SUCCESS:
      return {
        ...state,
        data: payload.data,
        userType: payload.userType,
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