import {
  ICO_SUCCESS,
  KOMPANIES_SUCCESS,
  KOMPANY_ERROR,
  KOMPANY_REQUEST,
  KOMPANY_SUCCESS,
  TRANSACTION_REQUEST,
  TRANSACTION_SUCCESS,
} from './actionTypes';
import { getFileContent } from '../services/ipfsService';
import { getCompanies, getLatestIpfsHash, getIcos } from '../services/ethereumService';

export const requestTransaction = (txHash) => ({
  type: TRANSACTION_REQUEST,
  payload: {
    txHash,
  }
});

export const successTransaction = () => ({
  type: TRANSACTION_SUCCESS,
});

export const getKompanyRequest = () => ({
  type: KOMPANY_REQUEST,
  payload: {
    isFetching: true,
  },
});

export const getKompanySuccess = (data, userType) => ({
  type: KOMPANY_SUCCESS,
  payload: {
    isFetching: false,
    data,
    userType,
  },
});

export const getKompanyError = error => ({
  type: KOMPANY_ERROR,
  payload: {
    isFetching: false,
    error,
  },
});

export const getKompany = address => async (dispatch) => {
  dispatch(getKompanyRequest());
  const { ipfsHash, owner, companyAddress } = await getLatestIpfsHash(address);
  const kompany = await getFileContent(ipfsHash);
  const userType = owner === web3.eth.accounts[0] ? 'founder' : 'user';
  dispatch(getKompanySuccess({
    ...JSON.parse(kompany),
    companyAddress,
  }, userType));
};

export const getKompaniesSuccess = data => ({
  type: KOMPANIES_SUCCESS,
  payload: {
    kompanies: data,
  }
});

export const getKompanies = () => async (dispatch) => {
  const kompanies = await getCompanies();
  let data = [];
  for (let i = 0; i < kompanies.length; i++) {
    const kompany = await getFileContent(kompanies[i].ipfsHash);
    data.push({
      ...JSON.parse(kompany),
      companyAddress: kompanies[i].companyAddress,
      isICOLive: kompanies[i].icoContract !== '0x0000000000000000000000000000000000000000',
    });
  }

  dispatch(getKompaniesSuccess(data));
};

export const getIcoSuccess = data => ({
  type: ICO_SUCCESS,
  payload: {
    data,
  },
});

export const getCurrentIcos = () => async (dispatch) => {
  const icos = await getIcos();
  console.log(icos);

  dispatch(getIcoSuccess(icos));
};