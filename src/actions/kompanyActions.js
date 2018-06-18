import {
  KOMPANY_ERROR,
  KOMPANY_REQUEST,
  KOMPANY_SUCCESS,
} from './actionTypes';
import { getFileContent } from '../services/ipfsService';

export const getKompanyRequest = () => ({
  type: KOMPANY_REQUEST,
  payload: {
    isFetching: true,
  },
});

export const getKompanySuccess = data => ({
  type: KOMPANY_SUCCESS,
  payload: {
    isFetching: false,
    data,
  },
});

export const getKompanyError = error => ({
  type: KOMPANY_ERROR,
  payload: {
    isFetching: false,
    error,
  },
});

export const getKompany = hash => async (dispatch) => {
  dispatch(getKompanyRequest());
  const kompany = await getFileContent(hash);
  dispatch(getKompanySuccess(JSON.parse(kompany)));
};